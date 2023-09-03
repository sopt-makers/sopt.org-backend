import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClearCacheResponseDto } from '../../src/clear-cache/dtos/clear-cache.dto';

export function ClearCacheDocs() {
  return applyDecorators(
    ApiTags('Cache'),
    ApiOperation({
      summary: '캐시 지우기',
      description:
        '캐싱된 Project, Member, Study 정보를 초기화합니다. => 신규데이터 업데이트 목적',
    }),
    ApiResponse({
      status: 201,
      type: ClearCacheResponseDto,
    }),
  );
}
