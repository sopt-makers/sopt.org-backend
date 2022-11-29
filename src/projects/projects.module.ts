import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { projectsService } from 'src/projects/services/projects.service';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [HttpModule],
  providers: [projectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
