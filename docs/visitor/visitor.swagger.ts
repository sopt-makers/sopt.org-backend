import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../../src/visitor/dtos/visitor-response.dto';

export function VisitorCountUpDocs() {
  return applyDecorators(
    ApiTags('Visitor'),
    ApiOperation({
      summary: '하루 방문자 수 증가',
    }),
    ApiOkResponse({
      status: 201,
      type: VisitorCountUpResponseDto,
    }),
  );
}

export function GetTodayVisitorDocs() {
  return applyDecorators(
    ApiTags('Visitor'),
    ApiOperation({
      summary: '하루 방문자 수 조회',
    }),
    ApiOkResponse({
      status: 200,
      type: GetTodayVisitorResponseDto,
    }),
  );
}
