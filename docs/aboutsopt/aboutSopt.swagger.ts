import { applyDecorators } from '@nestjs/common';
import { AboutSoptResponseDto } from '../../src/aboutsopt/dtos/aboutsopt-response.dto';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

export function GetAdminAboutSoptDocs() {
  return applyDecorators(
    ApiTags('AboutSoptAdmin'),
    ApiOperation({
      summary: 'Admin용 AboutSopt 조회, 해당 기수의 AboutSOPT가  없으면 생성',
    }),
    ApiExtraModels(AboutSoptResponseDto),
    ApiOkResponse({ type: AboutSoptResponseDto }),
  );
}
