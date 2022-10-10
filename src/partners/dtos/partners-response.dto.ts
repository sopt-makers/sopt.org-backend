import { ApiProperty } from '@nestjs/swagger';

export class PartnersResponseDto {
  @ApiProperty({ type: Number, required: true })
  id: number;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  image: string;
}
