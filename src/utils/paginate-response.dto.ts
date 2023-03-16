export class PaginateResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalCount: number;
  totalPage: number;
  currentPage: number;
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
