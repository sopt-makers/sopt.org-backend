import { ApiProperty } from '@nestjs/swagger';

export class SemestersInfoResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '역대 기수',
  })
  id: number;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수에 사용했던 컬러',
  })
  color: string | null;

  @ApiProperty({
    type: String,
    required: true,
    description: '기수에 사용했던 로고',
  })
  logo: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수에 사용했던 백그라운드 이미지',
  })
  background: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    description: '기수에 사용했던 테마명',
  })
  name: string | null;

  @ApiProperty({
    type: String,
    required: true,
    description: '기수 활동 기간',
  })
  year: string;
}
