import { ApiProperty } from '@nestjs/swagger';

import { Part } from '../../common/type';

export class ReviewsResponseDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'item의 기본 키',
  })
  id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '활동 리뷰 타이틀',
  })
  title: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '작성자',
  })
  author: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '작성자 프로필 이미지',
  })
  readonly authorProfileImageUrl: string | null;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '활동 기수',
  })
  generation: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '활동후기 설명',
  })
  readonly description: string;

  @ApiProperty({
    type: String,
    enum: Part,
    nullable: false,
    description: '활동 기수',
  })
  part: Part;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '주제',
  })
  subject: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '활동 리뷰 타이틀',
  })
  thumbnailUrl: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '후기 작성 플랫폼',
  })
  platform: string | null;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Redirect Link',
  })
  url: string;
}
