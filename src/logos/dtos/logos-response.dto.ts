import { ApiProperty } from '@nestjs/swagger';

export class LogosResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'logo의 Id',
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    description: 'logo 이미지의 url 주소',
  })
  image: string | null;
}
