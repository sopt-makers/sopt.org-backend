import { Part } from './../entities/reviews.entity';
import { PaginateResponseDto } from './../../utils/paginate-response.dto';
import { PageRequest } from 'src/utils/paginate-request.dto';
import { Body, Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Review } from '../entities/reviews.entity';
import { ReviewsService } from '../services/reviews.service';
import { GetReviewsDocs } from '../../../docs/review/review.swagger';
import { ReviewsRequestDto } from '../dtos/reviews-request.dto';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @GetReviewsDocs()
  async getReviews(
    @Query() filter: ReviewsRequestDto
  ):
  Promise<Review[]> {
    const reviews = await this.reviewsService.findAll(filter);
    return reviews;
  }

  @Get('/page')
  async getPages(@Query() page: PageRequest) {
    return this.reviewsService.getPage(page);
  }
}
