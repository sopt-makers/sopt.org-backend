import { PaginateResponseDto } from '../../src/utils/paginate-response.dto';

describe('Paginate Response Dto Test', () => {
  it.each([
    [10, 10, 1, 1],
    [11, 10, 1, 2],
    [20, 10, 1, 2],
    [9, 10, 1, 1],
    [0, 10, 1, 0],
  ])(
    'totalCount=%i, limit=%i, currentPage=%i 이면 totalPage=%i',
    (totalCount, limit, currentPage, expected) => {
      expect(
        new PaginateResponseDto([], totalCount, limit, currentPage).totalPage,
      ).toBe(expected);
    },
  );

  it.each([
    [10, 10, 1, false],
    [11, 10, 1, true],
    [11, 10, 2, false],
    [20, 10, 1, true],
    [9, 10, 1, false],
    [0, 10, 1, false],
  ])(
    'totalCount=%i, limit=%i, currentPage=%i 이면 hasNextPage=%i',
    (totalCount, limit, currentPage, expected) => {
      expect(
        new PaginateResponseDto([], totalCount, limit, currentPage).hasNextPage,
      ).toBe(expected);
    },
  );

  it.each([
    [10, 10, 1, false],
    [11, 10, 1, false],
    [11, 10, 2, true],
    [20, 10, 1, false],
    [9, 10, 1, false],
    [0, 10, 1, false],
  ])(
    'totalCount=%i, limit=%i, currentPage=%i 이면 hasPrevPage=%i',
    (totalCount, limit, currentPage, expected) => {
      expect(
        new PaginateResponseDto([], totalCount, limit, currentPage).hasPrevPage,
      ).toBe(expected);
    },
  );
});
