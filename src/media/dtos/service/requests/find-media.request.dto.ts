export class FindOneMediaRequestDto {
  id: string;
  userId?: string;
}

export class DeleteMediaRequestDto {
  id?: string;
  userId: string;
}

export class FindMediaRequestDto {
  ids: string[];
  userId?: string;
  hasPostId?: boolean;
}
