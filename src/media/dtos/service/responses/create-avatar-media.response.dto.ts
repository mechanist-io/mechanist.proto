import { MediaEntity } from 'src/media/entities/media.entity';

export class CreateAvatarMediaResponseDto {
  fields: Record<string, string>;
  uploadUrl: string;
  media: MediaEntity;
}
