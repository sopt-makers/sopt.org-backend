import { ApiProperty } from '@nestjs/swagger';

export class SemestersLeadersResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '회장단 정보 ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '파트',
  })
  part: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '이름',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '소개',
  })
  content: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '사진',
  })
  image: string;
}
