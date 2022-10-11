import { ApiProperty } from '@nestjs/swagger';
import { Link } from 'src/projects/dtos/link';
import { ProjectsTeamMember } from 'src/projects/dtos/projects-team-member';

export class ProjectsResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '프로젝트의 Id',
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트의 이름',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: '프로젝트가 진행된 기수',
  })
  semester: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 서비스 진행 여부',
  })
  isProvidingService: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 창업 여부',
  })
  isBusinessing: boolean;

  @ApiProperty({
    type: Array<ProjectsTeamMember>,
    required: false,
    description: '프로젝트의 팀원',
  })
  teamMembers?: Array<ProjectsTeamMember>;

  @ApiProperty({
    type: Array<ProjectsTeamMember>,
    required: false,
    description: '추가 합류한 팀원',
  })
  afterJoinedTeamMembers?: Array<ProjectsTeamMember>;

  @ApiProperty({
    type: Array<string>,
    required: true,
    description: '서비스 형태',
  })
  serviceType: Array<string>;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트 시작 날짜',
  })
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: '프로젝트 종료 날짜. 프로젝트가 진행중 일 경우 값 없음',
  })
  endDate?: Date;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 진행중 여부',
  })
  inProgress: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 한줄소개',
  })
  shortIntroduction: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 설명',
  })
  detail: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 로고 이미지 URL',
  })
  logoImageUrl: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '프로젝트 썸네일 이미지 URL',
  })
  thumbnailImageUrl?: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 이미지 URL',
  })
  projectImageUrl?: string;

  @ApiProperty({
    type: Array<Link>,
    required: true,
    description: '프로젝트 링크',
  })
  link?: Array<Link>;
}
