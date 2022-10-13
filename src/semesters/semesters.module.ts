import { Module } from '@nestjs/common';
import { SemestersController } from './controllers/semesters.controller';
import { SemestersDetailController } from './controllers/semesters-detail.controller';

@Module({
  controllers: [SemestersController, SemestersDetailController],
})
export class SemestersModule {}
