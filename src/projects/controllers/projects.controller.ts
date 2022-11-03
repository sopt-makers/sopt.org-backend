import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectsListResponseDto } from 'src/projects/dtos/projects-list-response.dto';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';
import { projectsService } from 'src/projects/services/projects.service';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: projectsService) {}

  @Get('')
  @GetProjectsDocs()
  async getProjects(
    @Query('filter') filter: string,
  ): Promise<ProjectsListResponseDto> {
    const projects = await this.projectsService.findAll(filter);

    projects.sort((a, b) => {
      if (a.generation > b.generation) return 1;
      else if (a.generation < b.generation) return -1;
      else {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else {
          if (a.uploadedAt > b.uploadedAt) return 1;
          else if (a.uploadedAt < b.uploadedAt) return -1;
          else return 0;
        }
      }
    });

    return { projects: projects, isEnd: true };
  }

  @Get('/:projectId')
  @GetProjectDocs()
  async getProject(
    @Param('projectId') projectId: number,
  ): Promise<ProjectsResponseDto> {
    return this.projectsService.findOne(projectId);
  }
}
