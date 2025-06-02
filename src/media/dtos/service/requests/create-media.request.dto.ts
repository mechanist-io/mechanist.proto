import type { MediaMimeType } from 'src/base/enums/media-type.enum';

export class CreateMediaRequestDto {
  mimeType!: MediaMimeType;
  userId!: string;
}
