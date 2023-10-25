import { PageRequest } from '../../utils/paginate-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Part } from '../../common/type';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReviewsRequestDto extends PageRequest {
  @ApiProperty({
    type: String,
    enum: Part,
    required: false,
    description: 'Part, 전체를 불러올땐 아무값도 안넣으면 됩니다.',
  })
  part?: Part;

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
