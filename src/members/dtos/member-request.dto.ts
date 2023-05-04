import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class MemberRequestDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly filter?: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly generation: number;
}
