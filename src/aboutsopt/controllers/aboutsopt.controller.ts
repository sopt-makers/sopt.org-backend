import { ActivityRequestDto } from './../dtos/activity-request.dto';
import { AboutSoptResponseDto } from './../dtos/aboutsopt-response.dto';
import { AboutSoptPostDto } from './../dtos/aboutsopt-post.dto';
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

@Controller('aboutsopt')
export class AboutSoptController {
  constructor(private readonly aboutsoptService: AboutSoptService) {}

  @Get()
  async getAboutSopt(
    @Query() aboutSoptRequestDto: AboutSoptRequestDto,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutsoptService.getAboutSopt(aboutSoptRequestDto);
  }

  @Post()
  async postAboutSopt(
    @Body() aboutSoptPostDto: AboutSoptPostDto,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutsoptService.postAboutSopt(aboutSoptPostDto);
  }

  @Post('/activity')
  async postActivity(
    @Body() activityRequestDto: ActivityRequestDto,
  ): Promise<AboutSoptResponseDto | null> {
    return this.aboutsoptService.postActivity(activityRequestDto);
  }
}
  