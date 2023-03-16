import { Part } from './../entities/reviews.entity';
import { ReviewsRequestDto } from './../dtos/reviews-request.dto';
import { PaginateResponseDto } from './../../utils/paginate-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewsResponseDto } from '../dtos/reviews-response.dto';
import { PageRequest } from 'src/utils/paginate-request.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>,
  ) {}
  async findAll(reviewsRequestDto:ReviewsRequestDto){
    if (!reviewsRequestDto.part){
      const reviews = await this.reviewsRepository.find();
      return reviews;
    }

    const review_part = await this.reviewsRepository.findBy({
      part: reviewsRequestDto.part,
    })
    return review_part;
  }
  // async getPage(page: PageRequest): Promise<PaginateResponseDto<ReviewsResponseDto>> {
  //   const total = await this.reviewsRepository.count();
  //   const pages = await this.reviewsRepository.find({
  //     take: page.getLimit(),
  //     skip: page.getOffset(),
  //     order: {semester: 'DESC'}
  //   });

  //   return new PaginateResponseDto(pages, total, pages.length, page.pageNo)
  // }

}
