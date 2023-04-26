import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CoreValueResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '코어밸류 id',
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '코어밸류',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '코어밸루 설명',
  })
  readonly subTitle: string;

  @ApiProperty({
    type: Date,
    nullable: false,
    description: '핵심가치 이미지 주소',
  })
  readonly imageUrl: string;

  @ApiProperty({
    type: Date,
    nullable: false,
    description: '생성일자',
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '핵심가치 설명',
  })
  readonly updatedAt: Date;
}

export class AboutSoptResponseDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    description: '기수',
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  readonly id: number;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    description: '배포 여부',
  })
  readonly isPublished: boolean;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '배너 이미지 주소',
  })
  readonly bannerImage: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '핵심가치 설명',
  })
  readonly coreDescription: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '기획파트 커리큘럼',
  })
  readonly planCurriculum: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '디자인파트 커리큘럼',
  })
  readonly designCurriculum: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '안드로이드 파트 커리큘럼',
  })
  readonly androidCurriculum: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'ios 파트 커리큘럼',
  })
  readonly iosCurriculum: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '웹 파트 커리큘럼',
  })
  readonly webCurriculum: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '서버 파트 커리큘럼',
  })
  readonly serverCurriculum: string;

  @ApiProperty({
    type: [CoreValueResponseDto],
    nullable: false,
    description: '코어밸류 리스트',
  })
  readonly coreValues: CoreValueResponseDto[];
}
