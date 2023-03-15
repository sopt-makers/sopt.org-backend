import { Controller, Get } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

}
