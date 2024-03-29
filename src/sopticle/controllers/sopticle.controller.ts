import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Headers,
  BadRequestException,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SopticleService } from '../services/sopticle.service';
import { GetSopticleListRequestDto } from '../dtos/get-sopticle-list-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import {
  CreateSopticleDocs,
  GetSopticleListDocs,
  LikeSopticleDocs,
  ScrapSopticleDocs,
  UnLikeSopticleDocs,
} from '../../../docs/sopticle/sopticle.swagger';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';
import { ScrapSopticleDto } from '../dtos/scrap-sopticle.dto';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';
import { CreateSopticleDto } from '../dtos/create-sopticle.dto';
import { CreateSopticleResponseDto } from '../dtos/create-sopticle-response.dto';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../../configs/env.config';

@ApiTags('Sopticle')
@Controller('sopticle')
export class SopticleController {
  constructor(
    private readonly sopticleService: SopticleService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  @Get('')
  @GetSopticleListDocs()
  async getSopticleList(
    @Query() getSopticleListRequestDto: GetSopticleListRequestDto,
    @Headers('session-id') session: string | null,
  ): Promise<PaginateResponseDto<SopticleResponseDto>> {
    if (!session) {
      throw new BadRequestException('session-id is required');
    }
    return this.sopticleService.paginateSopticles(
      getSopticleListRequestDto,
      session,
    );
  }

  @Post('')
  @CreateSopticleDocs()
  createSopticle(
    @Body() dto: CreateSopticleDto,
    @Headers('api-key') apiKey: string | null,
  ): Promise<CreateSopticleResponseDto> {
    if (!apiKey) {
      throw new BadRequestException('api-key is required');
    }

    if (apiKey !== this.configService.get('OFFICIAL_API_KEY')) {
      throw new UnauthorizedException('api-key is invalid');
    }

    return this.sopticleService.createSopticle(dto);
  }

  @Post('scrap')
  @ScrapSopticleDocs()
  scrapSopticle(
    @Body() dto: ScrapSopticleDto,
  ): Promise<CreateScraperResponseDto> {
    return this.sopticleService.scrapSopticle(dto);
  }

  @Post(':id/like')
  @LikeSopticleDocs()
  async likeSopticle(
    @Param('id', ParseIntPipe) id: number,
    @Headers('session-id') session: string | null,
  ): Promise<LikeSopticleResponseDto> {
    if (!session) {
      throw new BadRequestException('session-id is required');
    }
    return await this.sopticleService.like({ id, session });
  }

  @Post(':id/unlike')
  @UnLikeSopticleDocs()
  async unLikeSopticle(
    @Param('id', ParseIntPipe) id: number,
    @Headers('session-id') session: string | null,
  ): Promise<LikeSopticleResponseDto> {
    if (!session) {
      throw new BadRequestException('session-id is required');
    }
    return await this.sopticleService.unLike({ id, session });
  }
}
