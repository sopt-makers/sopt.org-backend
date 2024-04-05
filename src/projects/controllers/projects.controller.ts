import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';
import { ProjectService } from 'src/projects/services/project.service';
import { compareProjects } from 'src/utils/compare';
import { ProjectsResponseDto } from '../dtos/projects-response.dto';
import { GetSopticleListRequestDto } from '../../sopticle/dtos/get-sopticle-list-request.dto';
import { GetProjectsRequestDto } from '../dtos/get-projects-request.dto';
import { PaginateResponseDto } from '../../utils/paginate-response.dto';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectService) {}

  @Get('')
  @GetProjectsDocs()
  async getProjects(
    @Query() getProjectsRequestDto: GetProjectsRequestDto,
  ): Promise<PaginateResponseDto<ProjectsResponseDto>> {
    const projects = await this.projectsService.paginateProjects(
      getProjectsRequestDto,
    );
    projects.data.sort(compareProjects);

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
