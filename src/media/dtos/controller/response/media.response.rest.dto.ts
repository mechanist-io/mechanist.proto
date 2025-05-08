import { MediaEntity } from "src/media/entities/media.entity";

export class MediaResponseRestDto {
  id: string;
  url: string;
  mimeType: string;
  temp?: {
    fields: Record<string, string>;
    uploadUrl: string;
  };

  constructor(
    rawData: MediaEntity,
    temp?: { fields: Record<string, string>; uploadUrl: string },
  ) {
    this.id = rawData.id;
    this.url = rawData.url;
    this.mimeType = rawData.mimeType;
    this.temp = temp;
  }
}
