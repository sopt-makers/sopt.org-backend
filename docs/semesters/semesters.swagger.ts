import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SemestersListResponseDto } from 'src/semesters/dtos/semesters-list-response.dto';

export function GetSemestersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '역대 기수 전체 조회',
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: true,
      description: '페이지네이션 조회 조건 페이지 수',
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: true,
      description: '페이지네이션 조회로 기수 정보 가져올 갯수',
    }),
    ApiOkResponse({ type: SemestersListResponseDto }),
  );
}
