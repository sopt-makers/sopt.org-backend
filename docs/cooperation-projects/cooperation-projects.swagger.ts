import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CooperationProjectsResponseDto } from 'src/cooperation-projects/dtos/cooperation-projects-response.dto';

export function GetCooperationProjectsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '협력사와 진행한 프로젝트 조회',
    }),
    ApiOkResponse({ type: [CooperationProjectsResponseDto] }),
  );
}
