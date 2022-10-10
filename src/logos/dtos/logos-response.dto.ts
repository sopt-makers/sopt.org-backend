import { ApiProperty } from '@nestjs/swagger';

export class LogosResponseDto {
  @ApiProperty({ type: Number, required: true })
  id: number;

  @ApiProperty({ type: String, required: true })
  image: string;
}
