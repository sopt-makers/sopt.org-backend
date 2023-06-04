import { Part } from '../../common/type';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSopticleResponseDto {
  @ApiProperty({
    enum: Part,
    description: '활동 파트',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(Part)
  readonly part: Part;

  @ApiProperty({
    type: String,
    description: '솝티클 썸네일 이미지',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({
    type: String,
    description: '솝티클 제목',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '솝티클 설명',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: '활동 기수',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly generation: number;

  @ApiProperty({
    type: String,
    description: '작성자 이름',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({
    type: String,
    description: '작성자 프로필 이미지',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  readonly authorProfileImageUrl: string | null;

  @ApiProperty({
    type: Number,
    description: 'SopticleId',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
    description: '솝티클 리다이렉트 주소',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  readonly sopticleUrl: string;

  @ApiProperty({
    type: Date,
    description: '솝티클 생성일자',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  readonly uploadedAt: Date;
}
