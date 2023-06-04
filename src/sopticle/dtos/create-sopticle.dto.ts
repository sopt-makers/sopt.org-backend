import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { IsValidateSopticlePlatformUrl } from './scrap-sopticle.dto';
import { Part } from '../../common/type';

export class CreateSopticleAuthorDto {
  @ApiProperty({
    type: Number,
    description: '작성자 id',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
    description: '작성자 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: '작성자 프로필 이미지',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly profileImage: string | null;

  @ApiProperty({
    type: Number,
    description: '작성자 활동 기수',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly generation: number;

  @ApiProperty({
    enum: Part,
    description: '활동 파트',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Part)
  readonly part: Part;
}

export class CreateSopticleDto {
  @ApiProperty({
    type: Number,
    required: true,
    description:
      'pg에서 생성한 솝티클 id 입니다., 공홈 SopticleID와 같습니다. ( 추후 Sync가 맞지 않는다면 분리를 해야 할 수도 있을것 같아요)',
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '솝티클 주소 입니다. Notion 플랫폼을 제외하고 가능합니다.',
  })
  @IsUrl()
  @IsString()
  @IsValidateSopticlePlatformUrl({
    message: 'Notion 플랫폼은 업로드 할 수 없습니다.',
  })
  readonly link: string;

  @ApiProperty({
    type: [CreateSopticleAuthorDto],
    description: '작성자 정보',
  })
  @IsArray()
  @IsNotEmpty()
  readonly authors: CreateSopticleAuthorDto[];
}
