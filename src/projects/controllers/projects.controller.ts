import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get()
  async getProjects() {
    return 'GET /projects';
  }

  @Get('/:projectId')
  async getProject() {
    return 'GEt /projects/:projectId';
  }
}
