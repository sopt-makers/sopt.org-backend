import { ScrapSopticleDto } from './scrap-sopticle.dto';
import { Part } from '../../common/type';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSopticleDto extends ScrapSopticleDto {
  @ApiProperty({
    enum: Part,
    description: '활동 파트',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Part)
  readonly part: Part;

  @ApiProperty({
    type: String,
    description: '솝티클 썸네일 이미지',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({
    type: String,
    description: '솝티클 제목',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '솝티클 설명',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: '작성자 활동 기수',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly generation: number;

  @ApiProperty({
    type: Number,
    description: '작성자 id',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly authorId: number;

  @ApiProperty({
    type: String,
    description: '작성자 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly authorName: string;

  @ApiProperty({
    type: String,
    description: '작성자 프로필 이미지',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly authorProfileImageUrl: string;
}
