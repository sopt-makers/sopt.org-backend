import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  controllers: [ProjectsController],
})
export class ProjectsModule {}
