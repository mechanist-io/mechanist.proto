import { MediaMimeType } from '../enums/media-type.enum';

export function extractFileType(mimeType: MediaMimeType): string {
  return mimeType.split('/')[0];
}
