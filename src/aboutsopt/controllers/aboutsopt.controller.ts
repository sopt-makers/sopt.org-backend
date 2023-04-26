import { AboutSoptPostDto } from '../dtos/aboutsopt-post.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AboutSoptRequestDto } from '../dtos/aboutsopt-request.dto';

import { AboutSoptService } from '../services/aboutsopt.service';
import { AboutSoptResponseDto } from '../dtos/aboutsopt-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutsoptService: AboutSoptService) {}

  @Get()
  async getAboutSopt(
    @Query() aboutSoptRequestDto: AboutSoptRequestDto,
  ): Promise<AboutSoptResponseDto | null> {
    console.log(aboutSoptRequestDto);
    return this.aboutsoptService.getOrInit(aboutSoptRequestDto);
  }

  @Post()
  async postAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptPostDto,
  ): Promise<AboutSoptResponseDto | null> {
    console.log(aboutSoptPostDto);
    return this.aboutsoptService.postAboutSopt(aboutSoptPostDto);
  }
}
