import { ApiProperty } from '@nestjs/swagger';

export class PartnersResponseDto {
  @ApiProperty({ type: Number, required: true })
  id: number;

  @ApiProperty({ type: String, required: true, nullable: true })
  name: string | null;

  @ApiProperty({ type: String, required: true, nullable: true })
  image: string | null;
}
