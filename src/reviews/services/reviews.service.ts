import { ReviewsRequestDto } from './../dtos/reviews-request.dto';
import { PaginateResponseDto } from './../../utils/paginate-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Equal, Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { PageRequest } from 'src/utils/paginate-request.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>,
  ) {}
  async getReviews(reviewsRequestDto: ReviewsRequestDto, page: PageRequest): Promise<PaginateResponseDto<ReviewsResponseDto>> {
    const reviewQueryBuilder = await this.reviewsRepository.createQueryBuilder(
      'Review',
    );
    if (reviewsRequestDto.part){
      reviewQueryBuilder.andWhere('Review.part= :part', {
        part: reviewsRequestDto.part,
      });
    }
    reviewQueryBuilder.take(reviewsRequestDto.getLimit());
    reviewQueryBuilder.skip(reviewsRequestDto.getOffset());
    reviewQueryBuilder.orderBy({semester:'DESC'});

    const [reviews, reviewsCount] = await reviewQueryBuilder.getManyAndCount();

    return new PaginateResponseDto(reviews, reviewsCount, page.getLimit(), page.pageNo);
  }
  
}
