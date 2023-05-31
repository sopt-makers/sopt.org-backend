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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SopticleService } from '../services/sopticle.service';
import { GetSopticleListRequestDto } from '../dtos/get-sopticle-list-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import {
  GetSopticleListDocs,
  LikeSopticleDocs,
  ScrapSopticleDocs,
  UnLikeSopticleDocs,
} from '../../../docs/sopticle/sopticle.swagger';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';
import { CreateSopticleDto } from '../dtos/create-sopticle.dto';
import { CreateScraperResponseDto } from '../../scraper/dto/create-scraper-response.dto';

@ApiTags('Sopticle')
@Controller('sopticle')
export class SopticleController {
  constructor(private readonly sopticleService: SopticleService) {}

  @Get('')
  @GetSopticleListDocs()
  async getSopticleList(
    @Query() getSopticleListRequestDto: GetSopticleListRequestDto,
  ): Promise<PaginateResponseDto<SopticleResponseDto>> {
    return this.sopticleService.paginateSopticles(getSopticleListRequestDto);
  }

  @Post('scrap')
  @ScrapSopticleDocs()
  scrapSopticle(
    @Body() dto: CreateSopticleDto,
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
