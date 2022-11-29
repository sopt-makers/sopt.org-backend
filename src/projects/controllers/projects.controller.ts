import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';
import { projectsService } from 'src/projects/services/projects.service';
import { compareProjects } from 'src/utils/compare';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: projectsService) {}

  @Get('')
  @GetProjectsDocs()
  async getProjects(
    @Query('filter') filter: string,
  ): Promise<ProjectsResponseDto[]> {
    const projects = await this.projectsService.findAll(filter);
    projects.sort(compareProjects);

    return projects;
  }

  @Get('/:projectId')
  @GetProjectDocs()
  async getProject(
    @Param('projectId') projectId: number,
  ): Promise<ProjectsResponseDto> {
    return this.projectsService.findOne(projectId);
  }
}
