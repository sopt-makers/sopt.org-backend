import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LogosResponseDto } from 'src/logos/dtos/logos-response.dto';

export function GetLogosDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '프로젝트 로고 조회',
    }),
    ApiOkResponse({ type: [LogosResponseDto] }),
  );
}
