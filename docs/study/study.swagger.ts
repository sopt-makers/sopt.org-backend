import { StudyResponseDto } from '../../src/study/dtos/study-response.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

export function GetStudyDocs() {
  return applyDecorators(
    ApiTags('Study'),
    ApiOperation({
      summary: '스터디 정보 전부 가져오기',
    }),
    ApiQuery({
      name: 'isOnlyActiveGeneration',
      type: Boolean,
      required: true,
      description: '현재 기수만 불러올 것인가에 대한 여부',
    }),
    ApiOkResponse({ type: [StudyResponseDto] }),
  );
}
