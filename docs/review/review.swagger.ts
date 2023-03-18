import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';
import { ReviewsResponseDto } from '../../src/reviews/dtos/reviews-response.dto';

export function GetReviewsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '활동 후기 가져오기',
    }),
    ApiExtraModels(PaginateResponseDto, ReviewsResponseDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(ReviewsResponseDto) },
              },
            },
          },
        ],
      },
    }),
  );
}

export function GetRandomReviewByPart() {
  return applyDecorators(
    ApiOperation({
      summary: '랜덤 활동 후기 파트별로 하나씩 가져오기',
      description:
        '만약 특정 파트에 리뷰가 없다면 그 파트의 데이터는 나오지 않습니다.',
    }),
    ApiOkResponse({ type: [ReviewsResponseDto] }),
  );
}
