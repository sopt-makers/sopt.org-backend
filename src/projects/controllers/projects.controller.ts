import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  @Get('')
  @GetProjectsDocs()
  async getProjects() {
    return 'GET /projects';
  }

  @Get('/:projectId')
  @GetProjectDocs()
  async getProject() {
    return 'GET /projects/:projectId';
  }
}
