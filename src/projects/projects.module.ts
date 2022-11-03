import { Module } from '@nestjs/common';
import { projectsService } from 'src/projects/services/projects.service';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  providers: [projectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
