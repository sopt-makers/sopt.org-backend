import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export abstract class PageRequest {
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  @IsNumber()
  pageNo: number | 1;

  @Type(() => Number)
  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @IsNumber()
  limit: number | 10;

  getOffset(): number {
    return (this.pageNo - 1) * this.limit;
  }

  getLimit(): number {
    return this.limit;
  }
}
