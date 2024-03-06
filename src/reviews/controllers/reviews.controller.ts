import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ReviewsService } from '../services/reviews.service';
import {
  GetRandomReviewByPart,
  GetReviewsDocs,
  PutReviewsDocs,
  ReviewEntityMigration,
} from '../../../docs/review/review.swagger';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import {
  PutReviewsRequestDto,
  ReviewsRequestDto,
} from '../dtos/reviews-request.dto';
import { ApiTags } from '@nestjs/swagger';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @GetReviewsDocs()
  async getReviews(
    @Query() reviewsRequestDto: ReviewsRequestDto,
  ): Promise<PaginateResponseDto<ReviewsResponseDto>> {
    return await this.reviewsService.getReviews(reviewsRequestDto);
  }

  @Post()
  @PutReviewsDocs()
  async putReviews(
    @Body() putReviewsDto: [PutReviewsRequestDto],
  ): Promise<ReviewsResponseDto[]> {
    return await this.reviewsService.putReviews(putReviewsDto);
  }

  @Get('/random')
  @GetRandomReviewByPart()
  async GetRandomReviewByPart(): Promise<ReviewsResponseDto[]> {
    return await this.reviewsService.getRandomReviewByPart();
  }

  @Post('/entity/migration')
  @ReviewEntityMigration()
  async ReviewEntityMigration(): Promise<string> {
    return await this.reviewsService.reviewEntityMigration();
  }
}
