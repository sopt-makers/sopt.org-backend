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
