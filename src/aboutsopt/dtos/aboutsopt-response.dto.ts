import { ActivityResponseDto } from './activity-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AboutSoptResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '기수'
  })
  @IsNumber()
  @Transform(({value})=>parseInt(value), {toClassOnly: true})
  id: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '배포 여부'
  })
  isPublished: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description: '배너 이미지 주소'
  })
  bannerImage?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명'
  })
  coreDescription?: string;
  
  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 1 이미지 주소'
  })
  coreValue1?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 2 이미지 주소'
  })
  coreValue2?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 3 이미지 주소'
  })
  coreValue3?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '기획파트 커리큘럼'
  })
  planCurriculum?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '디자인파트 커리큘럼'
  })
  designCurriculum?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '안드로이드 파트 커리큘럼'
  })
  androidCurriculum?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'ios 파트 커리큘럼'
  })
  iosCurriculum?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '웹 파트 커리큘럼'
  })
  webCurriculum?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '서버 파트 커리큘럼'
  })
  serverCurriculum?: string;

  @ApiProperty({
    type: [ActivityResponseDto],
    required: false,
    description: '활동 내용'
  })
  activities: ActivityResponseDto[];

}