import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
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
      description: '이미 좋아요를 누른 게시글입니다.',
    }),
    ApiNotFoundResponse({
      description: '해당 sopticle이 존재하지 않습니다.',
    }),
  );
}
