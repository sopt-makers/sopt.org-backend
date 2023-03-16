import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponseDto<T> {
  data: T[];

  @ApiProperty({
    type: Boolean,
    nullable: false,
    description: '다음 페이지가 있는지 여부를 나타냄.',
  })
  hasNextPage: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    description: '이전 페이지가 있는지 여부를 나타냄.',
  })
  hasPrevPage: boolean;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '총 data 들의 갯수',
  })
  totalCount: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '총 페이지 카운트',
  })
  totalPage: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '현재 페이지',
  })
  currentPage: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'item을 몇개까지 가져올지에 대한 카운트',
  })
  limit: number;

  constructor(
    data: T[],
    totalCount: number,
    limit: number,
    currentPage: number,
  ) {
    this.limit = limit;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / limit);
    this.currentPage = currentPage;
    this.data = data;
    this.hasNextPage = this.totalPage - this.currentPage > 0;
    this.hasPrevPage = this.currentPage !== 1;
  }
}
