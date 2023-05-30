import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Sopticle } from '../entities/sopticle.entity';
import { SopticleLike } from '../entities/sopticleLike.entity';
import { PlaygroundService } from '../../internal/playground/playground.service';
import { ScraperService } from '../../scraper/scraper.service';
import { GetSopticlesResponseDto } from '../../internal/playground/dto/get-playground-sopticle-response.dto';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import { SopticleFactoryService } from './sopticle-factory.service';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';

@Injectable()
export class SopticleService {
  constructor(
    @InjectRepository(Sopticle)
    private readonly sopticleRepository: Repository<Sopticle>,
    @InjectRepository(SopticleLike)
    private readonly sopticleLikeRepository: Repository<SopticleLike>,
    private readonly playgroundService: PlaygroundService,
    private readonly scrapperService: ScraperService,
    private readonly sopticleFactoryService: SopticleFactoryService,
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
    console.log('pgSopticles', pgSopticles);
    if (_.isEmpty(willParsingSopticleUrl)) {
      return this.toSopticleResponseDto(sopticles);
    }

    const newSopticles: Sopticle[] = await this.parsingSopticles(
      willParsingSopticleUrl,
    );

    return this.toSopticleResponseDto([
      ...newSopticles,
      ...sopticles.filter((sopticle) => sopticle.load),
    ]);
  }

  toSopticleResponseDto(sopticles: Sopticle[]): SopticleResponseDto[] {
    return sopticles
      .filter(
        (sopticle) =>
          sopticle.thumbnailUrl && sopticle.description && sopticle.title,
      )
      .map((sopticle) => {
        return {
          id: sopticle.id,
          part: sopticle.part,
          generation: sopticle.generation,
          thumbnailUrl: sopticle.thumbnailUrl as string,
          title: sopticle.title as string,
          description: sopticle.description as string,
          author: sopticle.authorName,
          authorProfileImageUrl: sopticle.authorProfileImageUrl,
          sopticleUrl: sopticle.sopticleUrl,
          uploadedAt: sopticle.createdAt,
          likeCount: sopticle.likeCount,
        };
      });
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
        await this.sopticleRepository.create(
          this.sopticleFactoryService.createNewLoadFail(pgSopticle),
        );
        continue;
      }

      const sopticle = this.sopticleFactoryService.createNewLoadSuccess(
        pgSopticle,
        scrapResult,
      );

      const result = await this.sopticleRepository.create(sopticle);
      sopticles.push(result);
    }

    return sopticles;
  }

  //todo transaction
  async like({
    id,
    session,
  }: {
    session: string;
    id: number;
  }): Promise<LikeSopticleResponseDto> {
    const sopticle = await this.sopticleRepository.findOne({
      where: {
        id,
      },
    });

    if (!sopticle) {
      throw new NotFoundException('NotFoundSopticle id' + id);
    }

    const alreadyLike = await this.sopticleLikeRepository
      .createQueryBuilder('sopticleLike')
      .where('sopticleLike.sopticleId = :sopticleId', { sopticleId: id })
      .andWhere('sopticleLike.session = :session', { session })
      .getExists();

    if (alreadyLike) {
      throw new BadRequestException('AlreadyLike');
    }
    const sopticleLike = new SopticleLike();
    sopticleLike.sopticle = sopticle;
    await this.sopticleLikeRepository.save(sopticleLike);
    await this.sopticleRepository.increment({ id }, 'likeCount', 1);

    return {
      id: sopticleLike.id,
      sopticleId: sopticle.id,
      sessionId: sopticleLike.sessionId,
      createdAt: sopticleLike.createdAt,
    };
  }

  async unLike({
    id,
    session,
  }: {
    session: string;
    id: number;
  }): Promise<LikeSopticleResponseDto> {
    const sopticle = await this.sopticleRepository.findOne({
      where: {
        id,
      },
    });

    if (!sopticle) {
      throw new NotFoundException('NotFoundSopticle id' + id);
    }

    const sopticleLike = await this.sopticleLikeRepository
      .createQueryBuilder('sopticleLike')
      .where('sopticleLike.sopticleId = :sopticleId', { sopticleId: id })
      .andWhere('sopticleLike.session = :session', { session })
      .getOne();

    if (!sopticleLike) {
      throw new BadRequestException('Like 하지 않은 상태입니다.');
    }

    await this.sopticleRepository.decrement({ id }, 'likeCount', 1);
    await this.sopticleLikeRepository.delete({ id: sopticleLike.id });

    return {
      id: sopticleLike.id,
      sopticleId: sopticle.id,
      sessionId: sopticleLike.sessionId,
      createdAt: sopticleLike.createdAt,
    };
  }
}
