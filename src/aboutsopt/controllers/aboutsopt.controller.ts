import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AboutSoptService } from '../services/aboutsopt.service';
import { AboutSoptResponseDto } from '../dtos/aboutsopt-response.dto';
import { AboutSoptUpdateDto } from '../dtos/aboutsopt-update.dto';
import {
  GetAboutSoptDocs,
  GetAdminAboutSoptDocs,
  UpdateAboutSoptDocs,
  PublishAboutSoptDocs,
  GetPublishedAboutSoptIdsDocs,
} from '../../../docs/aboutsopt/aboutSopt.swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { GetAboutSoptResponseDto } from '../dtos/get-about-sopt-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutSoptService: AboutSoptService) {}

  @Get('')
  @GetAboutSoptDocs()
  async getAboutSopt(
    @Query('generation') id?: number,
  ): Promise<GetAboutSoptResponseDto> {
    return this.aboutSoptService.getAboutSopt(id);
  }

  @Get('admin/semester/:id')
  @GetAdminAboutSoptDocs()
  @UseGuards(AuthGuard)
  async getOrInit(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.getOrInit(id);
  }

  @Put('admin/semester/:id')
  @UseGuards(AuthGuard)
  @UpdateAboutSoptDocs()
  async updateAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptUpdateDto,
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto> {
    return this.aboutSoptService.updateAboutSopt(id, aboutSoptPostDto);
  }

  @Post('admin/semester/:id/publish')
  @UseGuards(AuthGuard)
  @PublishAboutSoptDocs()
  async publishAboutSopt(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.publishAboutSopt(id);
  }

  @Get('published-ids')
  @GetPublishedAboutSoptIdsDocs()
  getPublishedAboutSoptIds(): Promise<number[]> {
    return this.aboutSoptService.getPublishedAboutSoptIds();
  }
}
