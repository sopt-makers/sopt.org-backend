import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectsListResponseDto } from 'src/projects/dtos/projects-list-response.dto';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

import * as fs from 'fs';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  mockData: Array<ProjectsResponseDto> = JSON.parse(
    fs.readFileSync('src/mock/projects.json').toString(),
  );

  @Get('')
  @GetProjectsDocs()
  async getProjects(): Promise<ProjectsListResponseDto> {
    if (!this.mockData)
      throw new InternalServerErrorException('mock 데이터가 없습니다.');

    return { projects: this.mockData, isEnd: false };
  }

  @Get('/:projectId')
  @GetProjectDocs()
  async getProject(
    @Param('projectId') projectId: number,
  ): Promise<ProjectsResponseDto> {
    if (!this.mockData)
      throw new InternalServerErrorException('mock 데이터가 없습니다.');

    const result = this.mockData.find((element) => element.id == projectId);
    if (!result)
      throw new NotFoundException('해당 id의 데이터를 찾을 수 없습니다.');

    return result;
  }
}
