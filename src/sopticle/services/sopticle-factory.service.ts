import { Injectable } from '@nestjs/common';
import { Sopticle } from '../entities/sopticle.entity';
import { Part } from '../../common/type';
import { GetSopticlesResponseDto } from '../../internal/playground/dto/get-playground-sopticle-response.dto';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';

@Injectable()
export class SopticleFactoryService {
  createNewLoadSuccess(
    pgSopticle: GetSopticlesResponseDto,
    scrapResult: CreateScraperResponseDto,
  ): Sopticle {
    const sopticle = new Sopticle();
    sopticle.part = pgSopticle.writers[0].part as Part;
    sopticle.generation = pgSopticle.writers[0].generation;
    sopticle.authorName = pgSopticle.writers[0].name;
    sopticle.authorId = pgSopticle.writers[0].id;
    sopticle.authorProfileImageUrl = null;
    sopticle.title = scrapResult.title;
    sopticle.thumbnailUrl = scrapResult.thumbnailUrl;
    sopticle.description = scrapResult.description;
    sopticle.sopticleUrl = scrapResult.sopticleUrl;

    return sopticle;
  }

  createNewLoadFail(pgSopticle: GetSopticlesResponseDto) {
    const sopticle = new Sopticle();
    sopticle.part = pgSopticle.writers[0].part as Part;
    sopticle.generation = pgSopticle.writers[0].generation;
    sopticle.authorName = pgSopticle.writers[0].name;
    sopticle.authorId = pgSopticle.writers[0].id;
    sopticle.authorProfileImageUrl = null;
    sopticle.sopticleUrl = pgSopticle.link;
    return sopticle;
  }
}
