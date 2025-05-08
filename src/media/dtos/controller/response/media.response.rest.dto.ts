import { PostMediaEntity } from 'src/media/entities/post-media.entity';

export class MediaResponseRestDto {
  id: string;
  url: string;
  mimeType: string;
  temp?: {
    fields: Record<string, string>;
    uploadUrl: string;
  };

  constructor(
    rawData: PostMediaEntity,
    temp?: { fields: Record<string, string>; uploadUrl: string },
  ) {
    this.id = rawData.id;
    this.url = rawData.url;
    this.mimeType = rawData.mimeType;
    this.temp = temp;
  }
}
