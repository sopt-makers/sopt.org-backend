import { Module } from '@nestjs/common';
import { SemestersController } from './controllers/semesters.controller';
import { SemestersDetailController } from './controllers/semesters-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestersService } from 'src/semesters/services/semesters.service';
import { Semester } from 'src/semesters/entities/semesters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  providers: [SemestersService],
  controllers: [SemestersController, SemestersDetailController],
})
export class SemestersModule {}
