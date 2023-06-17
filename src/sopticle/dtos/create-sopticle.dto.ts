import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { IsValidateSopticlePlatformUrl } from './scrap-sopticle.dto';
import { Type } from 'class-transformer';

/**
 * description Pg에서 CreateSopticle을 생성할 때 사용하는 Role입니다. 해당 Role이 mapping되어 Part enum으로 변경됩니다.
 * 회장, 부회장, 미디어팀장, 운영팀장의 Role은 자동으로 Plan으로 매핑됩니다. 해당 이슈는 PG와 함께 해결해야 합니다.
 */
export enum CreateSopticleAuthorRole {
  '웹' = '웹',
  '기획' = '기획',
  '디자인' = '디자인',
  'iOS' = 'iOS',
  '서버' = '서버',
  '안드로이드' = '안드로이드',
  '웹 파트장' = '웹 파트장',
  '기획 파트장' = '기획 파트장',
  '디자인 파트장' = '디자인 파트장',
  'iOS 파트장' = 'iOS 파트장',
  '서버 파트장' = '서버 파트장',
  '안드로이드 파트장' = '안드로이드 파트장',
  '회장' = '회장',
  '부회장' = '부회장',
  '총무' = '총무',
  '운영 팀장' = '운영 팀장',
  '미디어 팀장' = '미디어 팀장',
}

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
    enum: CreateSopticleAuthorRole,
    description:
      'playgroud Role입니다. 2기 플그 Role이 Legacy로 남아있어서 이렇게 맵핑을 할 수밖에 없습니다. 플그측에서 Role이 변경된다면 공홈에서도 변경될 가능성이 큽니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CreateSopticleAuthorRole)
  readonly part: CreateSopticleAuthorRole;
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
  @Type(() => CreateSopticleAuthorDto)
  @ValidateNested({ each: true })
  readonly authors: CreateSopticleAuthorDto[];
}
