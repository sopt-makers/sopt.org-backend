import { ApiProperty } from '@nestjs/swagger';

export class CooperationProjectsResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '협력사와 진행한 프로젝트의 Id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '프로젝트를 진행한 연도',
  })
  year: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트의 이름',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트에 대한 설명',
  })
  content: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '프로젝트에 대한 추가 정보',
  })
  subContent: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '협력사와 진행한 프로젝트의 포스터 이미지',
  })
  posterImage: string;
}
