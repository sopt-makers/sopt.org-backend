import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AboutSoptService } from '../services/aboutsopt.service';
import { AboutSoptResponseDto } from '../dtos/aboutsopt-response.dto';
import { AboutSoptUpdateDto } from '../dtos/aboutsopt-update.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutSoptService: AboutSoptService) {}

  @Get('admin/semester/:id')
  async getOrInit(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutSoptService.getOrInit(id);
  }

  @Put('admin/semester/:id')
  async updateAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptUpdateDto,
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto> {
    return this.aboutSoptService.updateAboutSopt(id, aboutSoptPostDto);
  }
}
