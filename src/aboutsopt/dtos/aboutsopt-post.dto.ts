import { ActivityRequestDto } from './activity-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class AboutSoptPostDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '기수'
  })
  @IsNumber()
  @Transform(({value})=>parseInt(value), {toClassOnly: true})
  id: number;

  @ApiProperty({
    type: String,
    required: false,
    description: '배너 이미지 주소'
  })
  @IsString()
  @IsOptional()
  bannerImage?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 설명'
  })
  @IsString()
  @IsOptional()
  coreDescription?: string = "";
  
  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 1 이미지 주소'
  })
  @IsString()
  @IsOptional()
  coreValue1?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 2 이미지 주소'
  })
  @IsString()
  @IsOptional()
  coreValue2?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '핵심가치 3 이미지 주소'
  })
  @IsString()
  @IsOptional()
  coreValue3?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '기획파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  planCurriculum?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '디자인파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  designCurriculum?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '안드로이드 파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  androidCurriculum?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: 'ios 파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  iosCurriculum?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '웹 파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  webCurriculum?: string = "";

  @ApiProperty({
    type: String,
    required: false,
    description: '서버 파트 커리큘럼'
  })
  @IsString()
  @IsOptional()
  serverCurriculum?: string = "";

  @ApiProperty({
    type: [ActivityRequestDto],
    required: false,
    description: '활동 내용'
  })
  activities: ActivityRequestDto[];

}