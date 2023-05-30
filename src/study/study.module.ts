import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StudyController } from './controller/study.controller';
import { StudyService } from './service/study.service';
import { StudyRepository } from './repository/study.repository';

@Module({
  imports: [HttpModule],
  providers: [StudyService, StudyRepository],
  controllers: [StudyController],
  exports: [StudyService],
})
export class StudyModule {}
