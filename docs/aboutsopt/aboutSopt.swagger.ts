import { applyDecorators } from '@nestjs/common';
import { AboutSoptResponseDto } from '../../src/aboutsopt/dtos/aboutsopt-response.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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
