import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { ScraperModule } from '../scraper/scraper.module';
import { PlaygroudModule } from '../internal/playground/playgroud.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ScraperModule, PlaygroudModule],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
