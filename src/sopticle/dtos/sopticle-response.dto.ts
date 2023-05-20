import { ApiProperty } from '@nestjs/swagger';

import { Part } from '../../common/type';

export class SopticleResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Sopticle 고유키',
  })
  readonly id: number;

  @ApiProperty({
    enum: Part,
    description: '활동 파트',
  })
  readonly part: Part;

  @ApiProperty({
    type: Number,
    description: '기수',
  })
  readonly generation: number;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '솝티클 썸네일 이미지',
  })
  readonly thumbnailUrl: string;

  @ApiProperty({
    type: String,
    description: '솝티클 타이틀',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '솝티클 설명',
  })
  readonly description: string;

  @ApiProperty({
    type: String,
    description: '작성자 이름',
  })
  readonly author: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '작성자 프로필 이미지',
  })
  readonly authorProfileImageUrl: string;

  @ApiProperty({
    type: String,
    description: '솝티클 리다이렉트 주소',
  })
  readonly sopticleUrl: string;

  @ApiProperty({
    type: Date,
    description: '솝티클 업로드 날짜',
  })
  readonly uploadedAt: Date;

  @ApiProperty({
    type: Number,
    description: '좋아요',
  })
  readonly likeCount: number;
}
