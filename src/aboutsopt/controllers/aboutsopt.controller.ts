import { AboutSoptPostDto } from '../dtos/aboutsopt-post.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AboutSoptService } from '../services/aboutsopt.service';
import { AboutSoptResponseDto } from '../dtos/aboutsopt-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutsoptService: AboutSoptService) {}

  @Get('/semester/:id/admin')
  async getOrInit(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutsoptService.getOrInit(id);
  }

  @Post()
  async postAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptPostDto,
  ): Promise<AboutSoptResponseDto | null> {
    console.log(aboutSoptPostDto);
    return this.aboutsoptService.postAboutSopt(aboutSoptPostDto);
  }
}
