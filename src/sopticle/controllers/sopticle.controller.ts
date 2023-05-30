import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SopticleService } from '../services/sopticle.service';
import { GetSopticleListRequestDto } from '../dtos/get-sopticle-list-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';
import { SopticleResponseDto } from '../dtos/sopticle-response.dto';
import {
  GetSopticleListDocs,
  LikeSopticleDocs,
} from '../../../docs/sopticle/sopticle.swagger';
import { Cookies, NotNullPipe } from '../../common/decorator/cookie.decorator';
import { LikeSopticleResponseDto } from '../dtos/like-sopticle-response.dto';

@ApiTags('Sopticle')
@Controller('sopticle')
export class SopticleController {
  constructor(private readonly sopticleService: SopticleService) {}

  @Get('')
  @GetSopticleListDocs()
  async getSopticleList(
    @Query() getSopticleListRequestDto: GetSopticleListRequestDto,
  ): Promise<PaginateResponseDto<SopticleResponseDto>> {
    const sopticles = await this.sopticleService.getSopticles();
    return new PaginateResponseDto<SopticleResponseDto>(
      sopticles,
      0,
      getSopticleListRequestDto.getLimit(),
      getSopticleListRequestDto.pageNo,
    );
  }

  @Post(':id/like')
  @LikeSopticleDocs()
  async likeSopticle(
    @Query('id') id: number,
    @Cookies('session', NotNullPipe) session: string,
  ): Promise<LikeSopticleResponseDto> {
    return await this.sopticleService.like({ id, session });
  }
}
