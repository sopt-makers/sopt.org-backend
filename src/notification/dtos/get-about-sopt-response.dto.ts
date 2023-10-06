import { AboutSoptResponseDto } from './aboutsopt-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ActivitiesRecords {
  @ApiProperty({
    type: Number,
    nullable: false,
    description: '활동 멤버 수',
  })
  readonly activitiesMemberCount: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '프로젝트 수',
  })
  readonly projectCounts: number;

  @ApiProperty({
    type: Number,
    nullable: true,
    description: '스터디 수, CrewAPI 서버 에러시 Count대신 null을 반환합니다.',
  })
  readonly studyCounts: number | null;
}

export class GetAboutSoptResponseDto {
  @ApiProperty({
    type: AboutSoptResponseDto,
    nullable: false,
  })
  readonly aboutSopt: AboutSoptResponseDto;

  @ApiProperty({
    type: ActivitiesRecords,
    nullable: false,
  })
  readonly activitiesRecords: ActivitiesRecords;
}
