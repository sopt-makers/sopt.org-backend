import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import {
  PutReviewsRequestDto,
  ReviewsRequestDto,
} from '../dtos/reviews-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { Part } from '../../common/type';
import { ScraperService } from '../../scraper/scraper.service';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PlaygroundService } from '../../internal/playground/playground.service';
import { MemberRequestDto } from '../../members/dtos/member-request.dto';
import { MemberResponseDto } from '../../members/dtos/member-response.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly scrapperService: ScraperService,
    private readonly playgroundService: PlaygroundService,
  ) {}
  async getReviews(
    reviewsRequestDto: ReviewsRequestDto,
  ): Promise<PaginateResponseDto<ReviewsResponseDto>> {
    const reviewQueryBuilder = await this.reviewsRepository.createQueryBuilder(
      'Review',
    );
    if (reviewsRequestDto.part) {
      reviewQueryBuilder.andWhere('Review.part= :part', {
        part: reviewsRequestDto.part,
      });
    }
    if (reviewsRequestDto.generation) {
      reviewQueryBuilder.andWhere('Review.generation= :generation', {
        generation: reviewsRequestDto.generation,
      });
    }

    reviewQueryBuilder.take(reviewsRequestDto.getLimit());
    reviewQueryBuilder.skip(reviewsRequestDto.getOffset());
    reviewQueryBuilder.orderBy('generation', 'DESC');
    reviewQueryBuilder.addOrderBy('author', 'ASC');
    reviewQueryBuilder.addOrderBy('id', 'ASC');

    const [reviews, reviewsCount] = await reviewQueryBuilder.getManyAndCount();

    return new PaginateResponseDto<ReviewsResponseDto>(
      reviews,
      reviewsCount,
      reviewsRequestDto.getLimit(),
      reviewsRequestDto.pageNo,
    );
  }

  async putReviews(dto: PutReviewsRequestDto[]): Promise<Review[]> {
    const promiseList: any[] = [];
    const result: Review[] = [];
    const allReviews = await this.reviewsRepository.find();
    const allReviewUrls = allReviews.map((data) => {
      return data.url;
    });

    for (const review of dto) {
      if (allReviewUrls.includes(review.url)) continue;
      promiseList.push(async () => {
        const scrapResult = await this.scrapperService.scrap({
          articleUrl: review.url,
        });

        const reviewEntity = await this.reviewsRepository.save(
          Review.from({
            title: scrapResult.title,
            description: scrapResult.description,
            thumbnailUrl: scrapResult.thumbnailUrl,
            generation: review.generation,
            url: review.url,
            part: review.part,
            platform: review.platform,
            author: review.author,
            subject: review.subject,
          }),
        );
        result.push(reviewEntity);
      });
    }
    await Promise.all(
      promiseList.map((promise) => {
        return promise();
      }),
    );
    return result;
  }

  async getRandomReviewByPart(): Promise<Review[]> {
    const parts: Part[] = Object.values(Part);
    return (await Promise.all(
      parts
        .map((part: Part) => this.findRandomReview(part))
        .filter((review: Promise<Review | null>) => review !== null),
    )) as Review[];
  }

  async reviewEntityMigration(): Promise<string> {
    try {
      const [
        members25,
        members26,
        members27,
        members28,
        members29,
        members30,
        members31,
      ] = await Promise.all([
        this.playgroundService.getAllMembers({
          generation: 25,
        }),
        this.playgroundService.getAllMembers({
          generation: 26,
        }),
        this.playgroundService.getAllMembers({
          generation: 27,
        }),
        this.playgroundService.getAllMembers({
          generation: 28,
        }),
        this.playgroundService.getAllMembers({
          generation: 29,
        }),
        this.playgroundService.getAllMembers({
          generation: 30,
        }),
        this.playgroundService.getAllMembers({
          generation: 31,
        }),
      ]);

      const allMembers = [
        members25.members,
        members26.members,
        members27.members,
        members28.members,
        members29.members,
        members30.members,
        members31.members,
      ].reduce((combined, currentArray) => {
        currentArray.forEach((item) => {
          if (
            !combined.find((member) => {
              return member.id == item.id;
            })
          ) {
            combined.push(item);
          }
        });

        return combined;
      }, []);

      const allReviews = await this.reviewsRepository.find();

      const reviews = allReviews.filter(
        (review) => review.platform !== '깃헙블로그',
      );

      const promiseJobLength = 10;

      for (let i = 0; i < reviews.length; i += promiseJobLength) {
        const promiseList: any[] = [];
        for (let j = 0; j < promiseJobLength; j++) {
          const updateReview = reviews[j + i];
          if (!updateReview) break;
          promiseList.push(async () => {
            const updateEntity: QueryDeepPartialEntity<Review> = {};
            if (!updateReview.description || !updateReview.thumbnailUrl) {
              const scrapResult = await this.scrapperService.scrap({
                articleUrl: updateReview.url,
              });
              updateEntity.description = scrapResult.description;
              updateEntity.thumbnailUrl = scrapResult.thumbnailUrl;
            }
            if (!updateReview.authorProfileImageUrl) {
              const profileImage = allMembers.find((member) => {
                return member.name === updateReview.author;
              })?.profileImage;
              if (profileImage) {
                updateEntity.authorProfileImageUrl = profileImage;
              }
            }
            await this.reviewsRepository.update(updateReview.id, updateEntity);
          });
        }

        await Promise.all(
          promiseList.map((promise) => {
            return promise();
          }),
        );
      }

      // 깃헙블로그 하나는 수작업으로 처리
      const githubBlog = allReviews.find(
        (review) => review.platform === '깃헙블로그',
      );

      if (githubBlog) {
        const updateEntity: QueryDeepPartialEntity<Review> = {};
        if (!githubBlog.description) {
          updateEntity.description =
            '26기 SOPT 지원 및 면접 후기 주저리 반성도 할겸, SOPT 다음기수 지원할 분들에게 도움이 됐으면 하는 마음에 써본다 ㅎ\n' +
            '지난학기에 나는 YAPP 15기 활동을 하고 이번학기에는 학교생활에 전념 할 생각이였다. 거의 매주 서울에 왔다갔다 하느라 체력적으로 너무 힘들었고(왕복 4시간^^) 넘쳐나는 과제에 대외활동까지 하니까 괜히 일만 벌려놓은거같아 스트레스를 많이 받았었다.';
        }
        if (!githubBlog.thumbnailUrl) {
          updateEntity.thumbnailUrl =
            'https://user-images.githubusercontent.com/53978090/78689363-381cee80-7931-11ea-9d79-7475d8b09af6.png';
        }
        if (!githubBlog.authorProfileImageUrl) {
          updateEntity.authorProfileImageUrl = allMembers.find((member) => {
            return member.name === githubBlog.author;
          })?.profileImage;
        }
        await this.reviewsRepository.update(githubBlog.id, updateEntity);
      }

      return 'Success';
    } catch (err) {
      console.error(err);
      return 'Fail';
    }
  }

  private async findRandomReview(part: Part): Promise<Review | null> {
    return this.reviewsRepository
      .createQueryBuilder('Review')
      .where('Review.part = :part', { part: part })
      .orderBy('RANDOM()')
      .getOne();
  }
}
