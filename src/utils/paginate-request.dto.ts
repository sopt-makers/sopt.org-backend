import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export abstract class PageRequest {
  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  pageNo: number = 1;

  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  limit: number = 10;

  getOffset(): number {
    return (this.pageNo - 1) * this.limit;
  }

  getLimit(): number {
    return this.limit;
  }
}
