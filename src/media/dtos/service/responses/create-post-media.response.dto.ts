import { MediaEntity } from "src/media/entities/media.entity";

export class CreateMediaResponseDto {
  fields: Record<string, string>;
  uploadUrl: string;
  media: MediaEntity;
}
