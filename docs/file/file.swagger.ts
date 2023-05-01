import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PresignedUrlResponseDto } from '../../src/file/dto/presigned-url-response.dto';

export function GetPresignedUrlDocs() {
  return applyDecorators(
    ApiOperation({
      summary:
        '파일 업로드를 위한 presigned url 가져오기 지원 가능한 Type image/jpeg, image/png, image/jpg 입니다.',
    }),
    ApiBearerAuth(),
    ApiOkResponse({ type: PresignedUrlResponseDto }),
  );
}
