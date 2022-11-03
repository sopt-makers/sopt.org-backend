import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProjectType } from 'src/projects/dtos/category';
import { ProjectsListResponseDto } from 'src/projects/dtos/projects-list-response.dto';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

export function GetProjectsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '프로젝트 정보 전부 가져오기',
    }),
    ApiQuery({
      name: 'filter',
      type: String,
      required: false,
      description: '필터링 키워드',
      enum: ProjectType,
    }),
    ApiOkResponse({ type: ProjectsListResponseDto }),
  );
}

export function GetProjectDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '특정 프로젝트 정보 가져오기',
    }),
    ApiParam({
      name: 'projectId',
      type: Number,
      description: '가져올 프로젝트의 Id',
    }),
    ApiOkResponse({ type: ProjectsResponseDto }),
  );
}
