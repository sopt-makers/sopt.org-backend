import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category';
import { Link } from '../../internal/playground/dto/link';

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
    enum: ServiceType,
    required: true,
    isArray: true,
    example: [ServiceType.APP, ServiceType.WEB],
    description: '서비스 형태',
  })
  serviceType: Array<ServiceType>;

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
    type: Boolean,
    required: true,
    description: '서비스 이용 가능 여부',
  })
  isAvailable: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '창업중인지 여부',
  })
  isFounding: boolean;

  @ApiProperty({
    type: [Link],
    required: true,
    description: '프로젝트 링크',
  })
  link: Array<Link>;
}
