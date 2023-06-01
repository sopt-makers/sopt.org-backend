import { PageRequest } from '../../utils/paginate-request.dto';
import { Part } from '../../common/type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class GetSopticleListRequestDto extends PageRequest {
  @ApiProperty({
    required: false,
    description: 'Part별로 필터링 합니다, 값을 넣지 않을 경우 전체 조회합니다.',
    enum: Part,
  })
  @IsEnum(Part)
  @IsOptional()
  readonly part: Part | null;
}
