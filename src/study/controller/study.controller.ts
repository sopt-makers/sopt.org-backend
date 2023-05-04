import { StudyResponseDto } from '../dtos/study-response.dto';
import { StudyService } from '../service/study.service';
import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetStudyDocs } from 'docs/study/study.swagger';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}
  @Get('')
  @GetStudyDocs()
  async getAllStudy(): Promise<StudyResponseDto[]> {
    return this.studyService.findAll();
  }
}
