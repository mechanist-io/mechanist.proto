import type {
  IPagination,
  IPaginationOptions,
} from '../types/pagination.interface';

export const infinityPagination = <T>(
  data: T[],
  count: number,
  options: IPaginationOptions,
): IPagination<T> => ({
  data,
  count,
  hasNextPage: data.length === options.limit,
});
