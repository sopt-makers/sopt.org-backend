import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>,
  ) {}
  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find();
  }

}
