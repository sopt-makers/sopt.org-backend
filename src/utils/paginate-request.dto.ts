import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export abstract class PageRequest {
  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  @IsNumber()
  pageNo: number | 1;

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
