import { ApiProperty } from '@nestjs/swagger';

/** 미팅에서 제한 가능한 파트 종류 */
export enum MeetingJoinablePart {
  PM = 'PM',
  DESIGN = 'DESIGN',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  SERVER = 'SERVER',
  WEB = 'WEB',
}

export class StudyResponseDto {
  @ApiProperty({
    description: 'id',
    nullable: false,
  })
  readonly id: number;

  @ApiProperty({
    description: '기수',
    type: Number,
    nullable: true,
  })
  readonly generation: number | null;

  @ApiProperty({
    description: '스터디 관련 파트',
    enum: MeetingJoinablePart,
    isArray: true,
    nullable: false,
  })
  readonly parts: MeetingJoinablePart[];

  @ApiProperty({
    description: '스터디 명',
    nullable: false,
  })
  readonly title: string;

  @ApiProperty({
    description: '스터디 사진',
    type: String,
    nullable: true,
  })
  readonly imageUrl?: string | null;

  @ApiProperty({
    nullable: false,
  })
  readonly startDate: Date;

  @ApiProperty({
    nullable: false,
  })
  readonly endDate: Date;

  @ApiProperty({
    nullable: false,
  })
  readonly memberCount: number;
}
