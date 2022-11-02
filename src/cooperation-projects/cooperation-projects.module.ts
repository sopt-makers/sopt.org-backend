import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperationProject } from 'src/cooperation-projects/entities/cooperation-projects.entity';
import { CooperationProjectsService } from 'src/cooperation-projects/services/cooperation-projects.service';
import { CooperationProjectsController } from './controllers/cooperation-projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CooperationProject])],
  providers: [CooperationProjectsService],
  controllers: [CooperationProjectsController],
})
export class CooperationProjectsModule {}
