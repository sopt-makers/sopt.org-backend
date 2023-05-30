import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';
import { SopticleResponseDto } from '../../src/sopticle/dtos/sopticle-response.dto';

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
