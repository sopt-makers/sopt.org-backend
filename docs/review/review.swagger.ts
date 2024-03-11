import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';
import { ReviewsResponseDto } from '../../src/reviews/dtos/reviews-response.dto';
import { CreateSopticleDto } from '../../src/sopticle/dtos/create-sopticle.dto';
import { PutReviewsRequestDto } from '../../src/reviews/dtos/reviews-request.dto';

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

export function PutReviewsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: '여러 활동 후기 넣기',
    }),
    ApiBody({
      type: [PutReviewsRequestDto],
    }),
    ApiCreatedResponse({ type: [ReviewsResponseDto] }),
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

export function ReviewEntityMigration() {
  return applyDecorators(
    ApiOperation({
      summary: 'Review Entity 변경에 따른 내부 DB 값 Update 작업 (임시)',
      description: 'Description, AuthorProfileUrl 추가',
    }),
    ApiResponse({ status: 201, description: 'Success' }),
  );
}
