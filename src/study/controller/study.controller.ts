import { StudyResponseDto } from './../dtos/study-response.dto';
import { StudyService } from '../service/study.service';
import {
  Body,
    Controller,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}
  @Get('')
  async getAllStudy(
    @Query('isOnlyActiveGeneration') isOnlyActiveGeneration:boolean,
  ): Promise<StudyResponseDto[]> {
    const projects = await this.studyService.findAll(isOnlyActiveGeneration);

    return projects;
  }

}
  