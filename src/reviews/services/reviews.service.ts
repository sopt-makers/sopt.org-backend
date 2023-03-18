import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part, Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';

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
    reviewQueryBuilder.orderBy({ semester: 'DESC' });

    const [reviews, reviewsCount] = await reviewQueryBuilder.getManyAndCount();

    return new PaginateResponseDto<ReviewsResponseDto>(
      reviews,
      reviewsCount,
      reviewsRequestDto.getLimit(),
      reviewsRequestDto.pageNo,
    );
  }

  getRandomReviewByPart(): Promise<Review[]> {
    const parts: Part[] = Object.values(Part);
    return Promise.all(
      parts
        .map((part: Part) => this.findRandomReview(part))
        .filter((review: Promise<Review | null>) => review !== null),
    ) as Promise<Review[]>;
  }
  private async findRandomReview(part: Part): Promise<Review | null> {
    return this.reviewsRepository
      .createQueryBuilder('Review')
      .where('Review.part = :part', { part: part })
      .orderBy('RANDOM()')
      .getOne();
  }
}
