import { IPaginationOptions } from 'src/base/types/pagination.interface';

export class FindActiveSessionRequestDto implements IPaginationOptions {
  userId: string;
  page: number;
  limit: number;
}
