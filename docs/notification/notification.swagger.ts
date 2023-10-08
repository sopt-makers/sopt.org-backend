import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { RegisterNotificationResponseDto } from '../../src/notification/dtos/register-notification-response.dto';
import { GetNotificationListResponseDto } from '../../src/notification/dtos/notification-list-response.dto';

export function RegisterNotificationDocs() {
  return applyDecorators(
    ApiTags('Notification'),
    ApiOperation({
      summary: 'Register Notification Email',
    }),
    ApiOkResponse({ type: RegisterNotificationResponseDto }),
    ApiBadRequestResponse({
      description:
        "같은 기수에 이미 등록된 이메일인 경우 : 'Already Registered Email'",
    }),
  );
}

export function GetNotificationEmailListDocs() {
  return applyDecorators(
    ApiTags('Notification'),
    ApiQuery({
      name: 'generation',
      type: 'number',
      description: '기수',
      required: true,
    }),
    ApiOperation({
      summary: '특정 기수 모집알림에 신청한 이메일 리스트 목록 조회',
    }),
    ApiOkResponse({ type: GetNotificationListResponseDto }),
  );
}
