import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProjectType } from 'src/projects/dtos/category';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';
import {
  ProjectsResponseDto,
  ServiceType,
} from '../../src/projects/dtos/projects-response.dto';
import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';

export function GetProjectsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '프로젝트 정보 전부 가져오기',
    }),
    ApiExtraModels(PaginateResponseDto, ProjectsResponseDto),
    ApiQuery({
      name: 'filter',
      type: String,
      required: false,
      description: '필터링 키워드',
      enum: ProjectType,
    }),
    ApiQuery({
      name: 'platform',
      type: String,
      required: false,
      description: '웹/앱 필터링',
      enum: ServiceType,
    }),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(ProjectsResponseDto) },
              },
            },
          },
        ],
      },
    }),
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
    ApiOkResponse({ type: ProjectDetailResponseDto }),
  );
}
