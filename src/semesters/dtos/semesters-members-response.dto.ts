import { ApiProperty } from '@nestjs/swagger';
import { SemestersPartsResponseDto } from './semesters-parts-response.dto';

export class SemestersMembersResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '총 인원 수',
  })
  total: number;

  @ApiProperty({
    type: SemestersPartsResponseDto,
    required: true,
    description: '파트별 정보',
  })
  parts: SemestersPartsResponseDto[];
}
