import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';
import { SopticleResponseDto } from '../../src/sopticle/dtos/sopticle-response.dto';
import { LikeSopticleResponseDto } from '../../src/sopticle/dtos/like-sopticle-response.dto';

export function GetSopticleListDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sopticle 리스트 조회',
    }),
    ApiExtraModels(PaginateResponseDto, SopticleResponseDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(SopticleResponseDto) },
              },
            },
          },
        ],
      },
    }),
  );
}

export function LikeSopticleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sopticle 좋아요 누르기',
    }),
    ApiOkResponse({ type: LikeSopticleResponseDto }),
    ApiBadRequestResponse({
      description: '이미 좋아요를 누른 게시글입니다. | session-id is required',
    }),
    ApiNotFoundResponse({
      description: '해당 sopticle이 존재하지 않습니다.',
    }),
    ApiHeaders([
      {
        name: 'session-id',
        description:
          'session Id를 브라우저마다 임의로 생성해서 넣어주세요. 해당 세션값은 클리아언트를 식별하기 위한 값입니다.(uuid-v4 값으로..)',
      },
    ]),
  );
}

export function UnLikeSopticleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sopticle 좋아요 취소하기',
    }),
    ApiOkResponse({ type: LikeSopticleResponseDto }),
    ApiBadRequestResponse({
      description: '좋아요를 누르지 않았습니다. | session-id is required',
    }),
    ApiNotFoundResponse({
      description: '해당 sopticle이 존재하지 않습니다.',
    }),
    ApiHeaders([
      {
        name: 'session-id',
        description:
          'session Id를 브라우저마다 임의로 생성해서 넣어주세요. 해당 세션값은 클리아언트를 식별하기 위한 값입니다.(uuid-v4 값으로..)',
      },
    ]),
  );
}
