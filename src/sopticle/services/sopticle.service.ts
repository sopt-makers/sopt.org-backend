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
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';
import { GetSopticleListRequestDto } from '../dtos/get-sopticle-list-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { CreateSopticleDto } from '../dtos/create-sopticle.dto';

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

  async paginateSopticles(
    dto: GetSopticleListRequestDto,
  ): Promise<PaginateResponseDto<SopticleResponseDto>> {
    const { part } = dto;
    const sopticleQueryBuilder = await this.sopticleRepository
      .createQueryBuilder('Sopticle')
      .where('Sopticle.load = :load', { load: true })
      .take(dto.getLimit())
      .skip(dto.getOffset())
      .orderBy('id', 'DESC');

    if (part) {
      sopticleQueryBuilder.where('Sopticle.part = :part', { part });
    }

    const [sopticles, sopticleCount] =
      await sopticleQueryBuilder.getManyAndCount();

    return new PaginateResponseDto<SopticleResponseDto>(
      this.toSopticleResponseDto(sopticles),
      sopticleCount,
      dto.getLimit(),
      dto.pageNo,
    );
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
      .where('sopticleLike.sopticle.id = :sopticleId', { sopticleId: id })
      .andWhere('sopticleLike.sessionId = :session', { session })
      .getExists();

    if (alreadyLike) {
      throw new BadRequestException('AlreadyLike');
    }
    const sopticleLike = new SopticleLike();
    sopticleLike.sopticle = sopticle;
    sopticleLike.sessionId = session;
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
      .where('sopticleLike.sopticle.id = :sopticleId', { sopticleId: id })
      .andWhere('sopticleLike.sessionId = :session', { session })
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

  async scrapSopticle(
    dto: CreateSopticleDto,
  ): Promise<CreateScraperResponseDto> {
    return await this.scrapperService.scrap(dto);
  }
}
