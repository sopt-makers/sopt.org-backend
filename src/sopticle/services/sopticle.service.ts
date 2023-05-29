import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Sopticle } from '../entities/sopticle.entity';
import { SopticleLike } from '../entities/sopticleLike.entity';
import { PlaygroundService } from '../../internal/playground/playground.service';
import { ScraperService } from '../../scraper/scraper.service';
import { GetSopticlesResponseDto } from '../../internal/playground/dto/get-playground-sopticle-response.dto';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { Part } from '../../common/type';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';

@Injectable()
export class SopticleService {
  constructor(
    @InjectRepository(Sopticle)
    private readonly sopticleRepository: Repository<Sopticle>,
    @InjectRepository(SopticleLike)
    private readonly sopticleLikeRepository: Repository<SopticleLike>,
    private readonly playgroundService: PlaygroundService,
    private readonly scrapperService: ScraperService,
  ) {}

  async getSopticles(): Promise<SopticleResponseDto[]> {
    const pgSopticles = await this.playgroundService.getPlaygroundSopticles();
    const sopticles = await this.sopticleRepository.find({
      order: { id: 'DESC' },
    });
    const willParsingSopticleUrl = this.findDistinctSopticles(
      pgSopticles,
      sopticles,
    );

    if (_.isEmpty(willParsingSopticleUrl)) {
      return this.toSopticleResponseDto(sopticles);
    }

    const newSopticles: Sopticle[] = await this.parsingSopticles(
      willParsingSopticleUrl,
    );

    return this.toSopticleResponseDto([...newSopticles, ...sopticles]);
  }

  toSopticleResponseDto(sopticles: Sopticle[]): SopticleResponseDto[] {
    return sopticles.map((sopticle) => ({
      id: sopticle.id,
      part: sopticle.part,
      generation: sopticle.generation,
      thumbnailUrl: sopticle.thumbnailUrl,
      title: sopticle.title,
      description: sopticle.description,
      author: sopticle.authorName,
      authorProfileImageUrl: sopticle.authorProfileImageUrl,
      sopticleUrl: sopticle.sopticleUrl,
      uploadedAt: sopticle.createdAt,
      likeCount: sopticle.likeCount,
    }));
  }

  private findDistinctSopticles(
    pgSopticles: GetSopticlesResponseDto[],
    sopticles: Sopticle[],
  ): GetSopticlesResponseDto[] {
    const sopticleUrls = sopticles.map((sopticle) => sopticle.sopticleUrl);
    return pgSopticles.filter(
      (pgSopticle) => !sopticleUrls.includes(pgSopticle.link),
    );
  }

  async parsingSopticles(
    willParsingSopticleUrl: GetSopticlesResponseDto[],
  ): Promise<Sopticle[]> {
    const sopticles: Sopticle[] = [];
    for (const pgSopticle of willParsingSopticleUrl) {
      const scrapResult: CreateScraperResponseDto | null =
        await this.scrapperService
          .scrap({ sopticleUrl: pgSopticle.link })
          .catch((err) => {
            console.error('scrapError', err);
            return null;
          });
      if (scrapResult === null) {
        continue;
      }

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
      const result = await this.sopticleRepository.create(sopticle);
      sopticles.push(result);
    }

    return sopticles;
  }
}
