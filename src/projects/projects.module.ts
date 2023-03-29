import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [HttpModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
