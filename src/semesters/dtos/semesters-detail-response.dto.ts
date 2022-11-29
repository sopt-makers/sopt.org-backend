import { ApiProperty } from '@nestjs/swagger';
import { SemestersLeadersResponseDto } from './semesters-leaders-response.dto';
import { SemestersMembersResponseDto } from './semesters-members-response.dto';

export class SemestersDetailResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '기수',
  })
  id: number;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수에 사용했던 컬러',
  })
  color: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수 코어 밸류',
  })
  coreValue: string[] | null;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수 코어 이미지',
  })
  coreImage: string[] | null;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '솝트 활동 정보',
  })
  history: string | null;

  @ApiProperty({
    type: SemestersLeadersResponseDto,
    required: true,
    description: '회장단 정보',
  })
  leaders: SemestersLeadersResponseDto[];

  @ApiProperty({
    type: SemestersMembersResponseDto,
    required: true,
    description: '솝트 인원 구성 정보',
  })
  members: SemestersMembersResponseDto;
}
