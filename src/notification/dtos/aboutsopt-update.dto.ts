import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CoreValueUpdateDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsString()
  readonly id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 Title',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 sub Title',
  })
  @IsString()
  readonly subTitle: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '핵심가치 이미지 주소',
  })
  @IsString()
  readonly imageUrl: string;
}

export class AboutSoptUpdateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: '배너 이미지 주소',
  })
  @IsString()
  readonly bannerImage: string;

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
  readonly coreDescription: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly planCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly designCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly androidCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly iosCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly webCurriculum: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  readonly serverCurriculum: string;

  @ApiProperty({
    type: [CoreValueUpdateDto],
    required: false,
    description: '핵심가치 리스트',
  })
  @IsArray()
  readonly coreValues: CoreValueUpdateDto[];
}
