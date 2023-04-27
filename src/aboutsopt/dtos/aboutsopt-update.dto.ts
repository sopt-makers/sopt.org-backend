import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CoreValueUpdateDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '핵심가치 이미지 주소',
  })
  @IsString()
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 이미지 주소',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 이미지 주소',
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 이미지 주소',
  })
  @IsString()
  imageUrl: string;
}

export class AboutSoptUpdateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: '배너 이미지 주소',
  })
  @IsString()
  bannerImage: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'AboutTab 상단 타이틀',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  coreDescription: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  planCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  designCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  androidCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  iosCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  webCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명',
  })
  @IsString()
  serverCurriculum: string;

  @ApiProperty({
    type: [CoreValueUpdateDto],
    required: false,
    description: '핵심가치 설명',
  })
  @IsArray()
  coreValues: CoreValueUpdateDto[];
}
