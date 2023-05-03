import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
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

export function GetAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSopt'),
    ApiOperation({
      summary:
        '사용자용 AboutSopt 조회, 해당 기수의 AboutSOPT가  없으면 not found error',
    }),
    ApiParam({
      name: 'id',
      type: 'number',
      description: '기수',
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}

export function PublishAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSoptAdmin'),
    ApiOperation({
      summary:
        'Admin용 aboutsopt 정보 publish(사용자에게 보이도록), 비어있는 정보가 있을 경우 Bad Request',
    }),
    ApiParam({
      name: 'id',
      type: 'number',
      description: '기수',
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
    ApiBadRequestResponse({
      description: 'there is not filled field in : aboutSopt.id',
    }),
  );
}

export function UpdateAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSoptAdmin'),
    ApiParam({
      name: 'id',
      type: 'number',
      description: '기수',
    }),
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

export function GetRecentSemesterAboutSopt() {
  return applyDecorators(
    ApiTags('AboutSopt'),
    ApiOperation({
      summary: '최근 기수의 AboutSopt 조회, isPublish가 true인 것만 조회',
    }),
    ApiBadRequestResponse({
      description: "CoreValueId가_중복으로_들어올때: 'Not found about sopt'",
    }),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}
