import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AboutSoptRequestDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @Transform(({value})=>parseInt(value), {toClassOnly: true})
  id: number;
}