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
    nullable: false,
    description: '스터디 수',
  })
  readonly studyCounts: number;
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
