import { CrewModule } from './../internal/crew/crew.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StudyController } from './controller/study.controller';
import { StudyService } from './service/study.service';

@Module({
  imports: [HttpModule, CrewModule],
  providers: [StudyService],
  controllers: [StudyController],
  exports: [StudyService],
})
export class StudyModule {}
