import { StudyResponseDto } from '../../src/study/dtos/study-response.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

export function GetStudyDocs() {
  return applyDecorators(
    ApiTags('Study'),
    ApiOperation({
      summary: '스터디 정보 전부 가져오기',
      description: '현재는 32기 정보만 불러올 수 있습니다.',
    }),
    ApiOkResponse({ type: [StudyResponseDto] }),
  );
}
