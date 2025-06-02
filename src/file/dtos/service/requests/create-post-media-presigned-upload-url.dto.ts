import type { MediaMimeType } from 'src/base/enums/media-type.enum';

export class CreateMediaPresignedUploadUrlDto {
  userId!: string;
  mimeType!: MediaMimeType;
  key!: string;
}
