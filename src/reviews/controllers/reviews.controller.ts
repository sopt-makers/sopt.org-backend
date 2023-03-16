import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { Review } from '../entities/reviews.entity';
import { ReviewsService } from '../services/reviews.service';
import { GetReviewsDocs } from '../../../docs/review/review.swagger';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';

@UsePipes()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @GetReviewsDocs()
  async getReviews(@Query() filter: ReviewsRequestDto): Promise<Array<Review>> {
    // todo return type will be Promise<PaginateResponseDto<ReviewsResponseDto>>
    const reviews = await this.reviewsService.findAll();
    return reviews;
  }
}
