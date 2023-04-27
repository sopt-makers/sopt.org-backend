import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AboutSoptResponseDto } from '../../src/aboutsopt/dtos/aboutsopt-response.dto';

export function GetAdminAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSoptAdmin'),
    ApiOperation({
      summary: 'Admin용 AboutSopt 조회, 해당 기수의 AboutSOPT가  없으면 생성',
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}

export function UpdateAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSoptAdmin'),
    ApiOperation({
      summary: 'About sopt Admin Update',
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}
