import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category';
import { Link } from './link';
import { ServiceType } from './project-detail-response.dto';

export class ProjectsListResponseDto {
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
    type: [Link],
    required: true,
    description: '프로젝트 링크',
  })
  link: Array<Link>;
}
