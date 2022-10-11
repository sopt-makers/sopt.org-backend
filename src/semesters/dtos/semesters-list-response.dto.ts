import { ApiProperty } from '@nestjs/swagger';
import { SemestersInfoResponseDto } from './semesters-info-response.dto';

export class SemestersListResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '페이지네이션 조회 조건 페이지 수',
  })
  page: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '페이지네이션 조회로 기수 정보 가져올 갯수',
  })
  limit: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '조회한 기수 리스트 수',
  })
  total: number;

  @ApiProperty({
    type: SemestersInfoResponseDto,
    nullable: true,
    description: '기수 대표 정보',
  })
  semesters: SemestersInfoResponseDto[] | null;
}
