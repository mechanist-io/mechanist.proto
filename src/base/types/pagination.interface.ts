export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPagination<T> {
  data: T[];
  count: number;
  hasNextPage: boolean;
}

export interface IServicePagination<T> {
  data: T[];
  count: number;
}
