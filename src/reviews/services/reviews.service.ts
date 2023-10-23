import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { Part } from '../../common/type';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
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
    const allReviews = await this.reviewsRepository.find();
    console.log(allReviews.length);

    return '';
  }

  private async findRandomReview(part: Part): Promise<Review | null> {
    return this.reviewsRepository
      .createQueryBuilder('Review')
      .where('Review.part = :part', { part: part })
      .orderBy('RANDOM()')
      .getOne();
  }
}
