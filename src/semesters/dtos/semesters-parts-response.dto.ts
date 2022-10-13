import { ApiProperty } from '@nestjs/swagger';

export class SemestersPartsResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    description: '파트명',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: '해당 파트 인원 수',
  })
  count: number;
}
