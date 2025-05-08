import { PostMediaEntity } from 'src/media/entities/post-media.entity';

export class CreatePostMediaResponseDto {
  fields: Record<string, string>;
  uploadUrl: string;
  media: PostMediaEntity;
}
