import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SemestersDetailResponseDto } from 'src/semesters/dtos/semesters-detail-response.dto';

export function GetSemestersDetailDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '기수별 연혁 조회',
      description:
        '기수별 회원 구성 중 파트별 인원이 없는 경우, 총 인원 수만 조회합니다. 존재하지 않는 기수 id를 입력한 경우, 400 에러를 출력합니다. [파트]의 id값입니다. (1-5 까지는 회장단입니다.) 1: 회장  2: 부회장 3: 총무 4: 운영팀장 5: 미디어팀장 6: 기획파트장 7: 디자인파트  8: 안드로이드파트장 9: iOS파트장 10: 웹파트장 11: 서버파트장 12: 개발파트장 13: 클라이언트파트장 ',
    }),
    ApiParam({
      name: 'semesterId',
      type: Number,
      required: true,
      description: '기수',
    }),
    ApiOkResponse({ type: SemestersDetailResponseDto }),
  );
}
