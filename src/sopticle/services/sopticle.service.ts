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
import { ScraperService } from '../../scraper/scraper.service';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';
import { GetSopticleListRequestDto } from '../dtos/get-sopticle-list-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { ScrapSopticleDto } from '../dtos/scrap-sopticle.dto';
import {
  CreateSopticleDto,
  CreateSopticleAuthorRole,
} from '../dtos/create-sopticle.dto';
import { CreateSopticleResponseDto } from '../dtos/create-sopticle-response.dto';
import { SopticleAuthor } from '../entities/sopticle-author.entity';
import { Part } from '../../common/type';
import {InternalServerErrorException} from "@nestjs/common/exceptions/internal-server-error.exception";

@Injectable()
export class SopticleService {
  constructor(
    @InjectRepository(Sopticle)
    private readonly sopticleRepository: Repository<Sopticle>,
    @InjectRepository(SopticleLike)
    private readonly sopticleLikeRepository: Repository<SopticleLike>,
    @InjectRepository(SopticleAuthor)
    private readonly sopticleAuthorRepository: Repository<SopticleAuthor>,
    private readonly scrapperService: ScraperService,
  ) {}

  async paginateSopticles(
    dto: GetSopticleListRequestDto,
    sessionId: string,
  ): Promise<PaginateResponseDto<SopticleResponseDto>> {
    const { part } = dto;
    const sopticleQueryBuilder = await this.sopticleRepository
      .createQueryBuilder('Sopticle')
      .take(dto.getLimit())
      .skip(dto.getOffset())
      .orderBy('id', 'DESC');

    if (part) {
      sopticleQueryBuilder.where('Sopticle.part = :part', { part });
    }

    const [sopticles, sopticleCount] =
      await sopticleQueryBuilder.getManyAndCount();

    const sopticleIds = sopticles.map((sopticle) => sopticle.id);
    const sopticleLikes = await this.getLikedIdsBySession(
      sopticleIds,
      sessionId,
    );

    return new PaginateResponseDto<SopticleResponseDto>(
      this.toSopticleResponseDto(sopticles, sopticleLikes),
      sopticleCount,
      dto.getLimit(),
      dto.pageNo,
    );
  }

  private async getLikedIdsBySession(
    sopticleIds: number[],
    sessionId: string,
  ): Promise<{ sopticleId: number }[]> {
    if (_.isEmpty(sopticleIds)) {
      return [];
    }

    return await this.sopticleLikeRepository
      .createQueryBuilder('SopticleLike')
      .select('SopticleLike.sopticleId', 'sopticleId')
      .where('SopticleLike.sopticleId IN (:...sopticleIds)', { sopticleIds })
      .andWhere('SopticleLike.sessionId = :sessionId', { sessionId })
      .getRawMany<{ sopticleId: number }>();
  }

  toSopticleResponseDto(
    sopticles: Sopticle[],
    sopticleLikes: { sopticleId: number }[],
  ): SopticleResponseDto[] {
    return sopticles.map((sopticle) => {
      const isLiked = sopticleLikes.some(
        ({ sopticleId }) => sopticleId === sopticle.id,
      );
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
        liked: isLiked,
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
    const alreadyLike = await this.isLiked(id, session);

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

  async isLiked(id: number, session: string): Promise<boolean> {
    return await this.sopticleLikeRepository
      .createQueryBuilder('sopticleLike')
      .where('sopticleLike.sopticle.id = :sopticleId', { sopticleId: id })
      .andWhere('sopticleLike.sessionId = :session', { session })
      .getExists();
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
    dto: ScrapSopticleDto,
  ): Promise<CreateScraperResponseDto> {
    return await this.scrapperService.scrap(dto);
  }

  async createSopticle(
    dto: CreateSopticleDto,
  ): Promise<CreateSopticleResponseDto> {
    const hasSopticleUrl = await this.sopticleRepository.findOne({
      where: {
        sopticleUrl: dto.link,
      },
    });

    if (hasSopticleUrl) {
      throw new BadRequestException('이미 등록된 솝티클 입니다.');
    }

    try {
      const scrapResult = await this.scrapperService.scrap({
        sopticleUrl: dto.link,
      });

      const sopticle = await this.sopticleRepository.save(
        Sopticle.from({
          pgSopticleId: dto.id,
          part: this.roleToPart(dto.authors[0].part),
          generation: dto.authors[0].generation,
          thumbnailUrl: scrapResult.thumbnailUrl,
          title: scrapResult.title,
          description: scrapResult.description,
          authorId: dto.authors[0].id,
          authorName: dto.authors[0].name,
          authorProfileImageUrl: dto.authors[0].profileImage,
          sopticleUrl: scrapResult.sopticleUrl,
        }),
      );

      const authorEntities = dto.authors.map((authorDto) =>
        SopticleAuthor.from({
          ...authorDto,
          pgUserId: authorDto.id,
          sopticle: sopticle,
          part: this.roleToPart(authorDto.part),
        }),
      );

      await this.sopticleAuthorRepository.save(authorEntities);

      return {
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
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('솝티클 업로드에 실패하였습니다.');
    }
  }

  /**
   * @param role
   * @private
   * @description CreateSopticleRole을 공홈 솝티클 파트 enum으로 변환합니다.
   */
  private roleToPart(role: CreateSopticleAuthorRole): Part {
    if (
      [
        CreateSopticleAuthorRole['웹 파트장'],
        CreateSopticleAuthorRole['웹'],
      ].includes(role)
    ) {
      return Part.WEB;
    }
    if (
      [
        CreateSopticleAuthorRole['기획 파트장'],
        CreateSopticleAuthorRole['기획'],
      ].includes(role)
    ) {
      return Part.PLAN;
    }

    if (
      [
        CreateSopticleAuthorRole['디자인 파트장'],
        CreateSopticleAuthorRole['디자인'],
      ].includes(role)
    ) {
      return Part.DESIGN;
    }

    if (
      [
        CreateSopticleAuthorRole['iOS 파트장'],
        CreateSopticleAuthorRole['iOS'],
      ].includes(role)
    ) {
      return Part.iOS;
    }

    if (
      [
        CreateSopticleAuthorRole['서버 파트장'],
        CreateSopticleAuthorRole['서버'],
      ].includes(role)
    ) {
      return Part.SERVER;
    }

    if (
      [
        CreateSopticleAuthorRole['안드로이드 파트장'],
        CreateSopticleAuthorRole['안드로이드'],
      ].includes(role)
    ) {
      return Part.ANDROID;
    }
    return Part.PLAN;
  }
}
