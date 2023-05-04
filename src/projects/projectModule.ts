import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProjectService } from 'src/projects/services/project.service';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [HttpModule],
  providers: [ProjectService],
  controllers: [ProjectsController],
  exports: [ProjectService],
})
export class ProjectModule {}
