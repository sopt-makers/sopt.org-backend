import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';
import { ProjectsService } from 'src/projects/services/projects.service';
import { compareProjects } from 'src/utils/compare';
import { ProjectsResponseDto } from '../dtos/projects-response.dto';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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
  ): Promise<ProjectDetailResponseDto> {
    return this.projectsService.findOne(projectId);
  }
}
