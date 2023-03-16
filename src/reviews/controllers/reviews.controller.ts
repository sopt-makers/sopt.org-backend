import { Controller, Get } from '@nestjs/common';
import { Review } from '../entities/reviews.entity';
import { ReviewsService } from '../services/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Get()
  async getReviews(): Promise<Array<Review>>{
    const reviews = await this.reviewsService.findAll();
    return reviews
  }
}
