import { IPaginationOptions } from '../types/pagination.interface';

export function getSanitizedPageAndLimit(
  request: IPaginationOptions,
  maxLimit?: number,
): IPaginationOptions {
  const { limit, page } = request;

  const safeMaxLimit = maxLimit ?? 50;
  const sanitizedLimit =
    limit > 0 && limit < safeMaxLimit ? limit : safeMaxLimit;
  const sanitizedPage = page > 0 ? page : 1;

  return {
    limit: sanitizedLimit,
    page: sanitizedPage,
  };
}
