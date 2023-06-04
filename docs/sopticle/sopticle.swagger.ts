import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
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
import { CreateScraperResponseDto } from '../../src/scraper/dto/create-scraper-response.dto';
import { ScrapSopticleDto } from '../../src/sopticle/dtos/scrap-sopticle.dto';
import { CreateSopticleResponseDto } from '../../src/sopticle/dtos/create-sopticle-response.dto';
import { CreateSopticleDto } from '../../src/sopticle/dtos/create-sopticle.dto';

export function GetSopticleListDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sopticle 리스트 조회',
    }),
    ApiExtraModels(PaginateResponseDto, SopticleResponseDto),
    ApiHeaders([
      {
        name: 'session-id',
        description:
          'session Id를 브라우저마다 임의로 생성해서 넣어주세요. 해당 세션값은 클리아언트를 식별하기 위한 값입니다.(uuid-v4 값으로..)',
      },
    ]),
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

export function ScrapSopticleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sopticle 스크랩',
    }),
    ApiOkResponse({ type: CreateScraperResponseDto }),
    ApiBody({
      type: ScrapSopticleDto,
    }),
  );
}

export function CreateSopticleDocs() {
  return applyDecorators(
    ApiHeaders([
      {
        name: 'api-key',
        description:
          'api-key를 넣어주세요. 해당 키는 공홈 관리자에게 문의해주세요.',
      },
    ]),
    ApiOperation({
      summary: 'Sopticle 생성',
    }),
    ApiOkResponse({ type: CreateSopticleResponseDto }),
    ApiBody({
      type: CreateSopticleDto,
    }),
    ApiBadRequestResponse({
      description: '이미 등록된 솝티클 입니다.',
    }),
  );
}
