import { MemberResponseDto } from './../../src/members/dtos/member-response-dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

export function GetMembersDocs() {
  return applyDecorators(
    ApiTags('Members'),
    ApiOperation({
      summary: '멤버 정보 가져오기',
    }),
    ApiQuery({
      name: 'filter',
      type: Number,
      required: true,
      description:
        '파트 정보(1 -> 기획 / 2 -> 디자인 / 3 -> 웹 / 4 -> 서버 / 5 -> 안드로이드 / 6 -> iOS)',
    }),
    ApiQuery({
      name: 'generation',
      type: Number,
      required: true,
      description: '기수',
    }),
    ApiOkResponse({ type: [MemberResponseDto] }),
  );
}
