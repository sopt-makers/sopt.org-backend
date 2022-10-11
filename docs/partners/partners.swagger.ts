import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PartnersResponseDto } from 'src/partners/dtos/partners-response.dto';

export function GetPartnersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '협력사 정보 가져오기',
    }),
    ApiOkResponse({ type: Array<PartnersResponseDto> }),
  );
}
