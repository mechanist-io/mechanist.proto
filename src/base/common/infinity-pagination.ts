import { IPagination, IPaginationOptions } from '../types/pagination.interface';

export const infinityPagination = <T>(
  data: T[],
  count: number,
  options: IPaginationOptions,
): IPagination<T> => {
  return {
    data,
    count,
    hasNextPage: data.length === options.limit,
  };
};
