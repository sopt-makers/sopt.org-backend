import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
    ApiBadRequestResponse({
      description:
        "CoreValueId가_중복으로_들어올때: 'Duplicated core value id'",
    }),
    ApiNotFoundResponse({
      description:
        "AboutSopt_ID가_없는_아이디일때: 'Not found about sopt with id: ${id}' / CoreValue의_ID가_aboutSopt와_연관된_아이디가_아닐때:'Not found core value with id: ${id}'",
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}
