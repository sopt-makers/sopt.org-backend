import { ApiProperty } from '@nestjs/swagger';
import { Link } from 'src/projects/dtos/link';
import { Member } from 'src/projects/dtos/member';
import { Category } from 'src/projects/dtos/category';

export enum ServiceType {
  WEB = 'WEB',
  APP = 'APP',
}

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
  generation: number;

  @ApiProperty({
    type: Category,
    required: true,
    description: '프로젝트의 카테고리',
  })
  category: Category;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트 시작 날짜',
  })
  startAt: Date;

  @ApiProperty({
    type: Date,
    required: false,
    nullable: true,
    description: '프로젝트 종료 날짜. 프로젝트가 진행중 일 경우 값 없음',
  })
  endAt?: Date;

  @ApiProperty({
    enum: ServiceType,
    required: true,
    isArray: true,
    example: [ServiceType.APP, ServiceType.WEB],
    description: '서비스 형태',
  })
  serviceType: Array<ServiceType>;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 서비스 진행 여부',
  })
  isAvailable: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 창업 여부',
  })
  isFounding: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 한줄소개',
  })
  summary: string;

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
  logoImage: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    description: '프로젝트 썸네일 이미지 URL',
  })
  thumbnailImage: string | null;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    description: '프로젝트 이미지 URL',
  })
  projectImage: string | null;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트를 등록한 시간',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트를 수정한 시간',
  })
  updatedAt: Date;

  @ApiProperty({
    type: [Link],
    required: true,
    description: '프로젝트 링크',
  })
  link: Array<Link>;

  @ApiProperty({
    type: [Member],
    required: true,
    description: '프로젝트 팀원',
  })
  members: Array<Member>;
}
