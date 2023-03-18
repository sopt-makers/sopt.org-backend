import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ReviewsService } from '../services/reviews.service';
import {
  GetRandomReviewByPart,
  GetReviewsDocs,
} from '../../../docs/review/review.swagger';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @GetReviewsDocs()
  async getReviews(
    @Query() reviewsRequestDto: ReviewsRequestDto,
  ): Promise<PaginateResponseDto<ReviewsResponseDto>> {
    return this.reviewsService.getReviews(reviewsRequestDto);
  }

  @Get('/random')
  @GetRandomReviewByPart()
  GetRandomReviewByPart(): Promise<ReviewsResponseDto[]> {
    return this.reviewsService.getRandomReviewByPart();
  }
}
