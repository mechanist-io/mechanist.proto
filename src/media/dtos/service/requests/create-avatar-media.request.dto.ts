import { MediaMimeType } from 'src/base/enums/media-type.enum';

export class CreateMediaRequestDto {
  mimeType: MediaMimeType; // TODO: Image? Video? or all? algo-boilerplate -> media
  userId: string;
}
