import { PageRequest } from '../../utils/paginate-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Part } from '../../common/type';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { string } from 'joi';

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

export class PutReviewsRequestDto {
  @ApiProperty({
    required: true,
    description: '활동후기 링크',
    type: String,
  })
  readonly url: string;

  @ApiProperty({
    type: String,
    enum: Part,
    required: true,
  })
  readonly part: Part;

  @ApiProperty({
    required: true,
    description:
      '활동기수로 필터링 합니다, 값을 넣지 않을 경우 전체 조회합니다.',
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  readonly generation: number;

  @ApiProperty({
    required: true,
    description: '작성자',
    type: String,
  })
  readonly author: string;

  @ApiProperty({
    required: true,
    description: '활동 종류',
    type: String,
  })
  readonly subject: string;

  @ApiProperty({
    required: true,
    description: '활동후기 플랫폼',
    type: String,
  })
  readonly platform: string;
}
