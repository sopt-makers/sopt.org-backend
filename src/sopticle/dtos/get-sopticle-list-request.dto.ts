import { PageRequest } from '../../utils/paginate-request.dto';
import { Part } from '../../common/type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetSopticleListRequestDto extends PageRequest {
  @ApiProperty({
    required: false,
    description: 'Part별로 필터링 합니다, 값을 넣지 않을 경우 전체 조회합니다.',
    enum: Part,
  })
  @IsEnum(Part)
  @IsOptional()
  readonly part: Part | null;

  @ApiProperty({
    required: false,
    description:
      '활동기수로 필터링 합니다, 값을 넣지 않을 경우 전체 조회합니다.',
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  readonly generation: number | null;
}
