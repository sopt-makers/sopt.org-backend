import { StudyResponseDto } from '../dtos/study-response.dto';
import { StudyService } from '../service/study.service';
import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetStudyDocs } from 'docs/study/study.swagger';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}
  @Get('')
  @GetStudyDocs()
  async getAllStudy(
    @Query('isOnlyActiveGeneration') isOnlyActiveGeneration: boolean,
  ): Promise<StudyResponseDto[]> {
    const projects = await this.studyService.findAll(isOnlyActiveGeneration);

    return projects;
  }
}
