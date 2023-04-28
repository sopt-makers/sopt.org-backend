import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
} from '../../../docs/aboutsopt/aboutSopt.swagger';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutSoptService: AboutSoptService) {}

  @Get('semester/:id')
  @GetAboutSoptDocs()
  async getAboutSopt(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.getAboutSopt(id);
  }

  @Get('admin/semester/:id')
  @GetAdminAboutSoptDocs()
  async getOrInit(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.getOrInit(id);
  }

  @Put('admin/semester/:id')
  @UpdateAboutSoptDocs()
  async updateAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptUpdateDto,
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto> {
    return this.aboutSoptService.updateAboutSopt(id, aboutSoptPostDto);
  }

  @Post('admin/semester/:id/publish')
  @PublishAboutSoptDocs()
  async publishAboutSopt(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.publishAboutSopt(id);
  }
}
