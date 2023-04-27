import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetPresignedUrlDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '파일 업로드를 위한 presigned url 가져오기',
    }),
    ApiOkResponse({ type: String }),
  );
}
