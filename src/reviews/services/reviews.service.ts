import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { Part } from '../../common/type';
import { ScraperService } from '../../scraper/scraper.service';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly scrapperService: ScraperService,
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
      const allReviews = await this.reviewsRepository.find();
      // const githubBlog = allReviews.find(
      //   (review) => review.platform === '깃헙블로그',
      // );
      // console.log(githubBlog);

      // 깃헙블로그 하나는 수작업으로 처리해야함...
      const reviews = allReviews.filter(
        (review) =>
          review.platform !== '깃헙블로그' &&
          review.id !== 65 &&
          review.id !== 85,
      );

      const promiseJobLength = 10;
      const promiseResult = [];

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
              return scrapResult; // Todo. 지워야함
            }
            if (!updateReview.authorProfileImageUrl) {
              // Todo. Find Review Author Profile Image with Name
              // updateEntity.authorProfileImageUrl = ;
            }

            // await this.reviewsRepository.update(updateReview.id, updateEntity);
          });
        }
        const result: CreateScraperResponseDto[] = await Promise.all(
          promiseList.map((promise) => {
            return promise();
          }),
        );

        promiseResult.push(
          ...result.map((scrapResult) => {
            return scrapResult.articleUrl;
          }),
        );
      }
      console.log(promiseResult.length);

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

  private async updateReview(review: Review) {
    const updateEntity: QueryDeepPartialEntity<Review> = {};
    if (!review.description) {
      const scrapResult = await this.scrapperService.scrap({
        articleUrl: review.url,
      });
      updateEntity.description = scrapResult.description;
    }
    if (!review.authorProfileImageUrl) {
      // Todo. Find Review Author Profile Image with Name
      // updateEntity.authorProfileImageUrl = ;
    }

    // await this.reviewsRepository.update(updateReview.id, updateEntity);
  }
}
