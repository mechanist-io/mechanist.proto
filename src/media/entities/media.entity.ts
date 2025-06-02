import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../base/entities/base-entity';
import {
  MediaMimeType,
  MediaSourceType,
} from '../../base/enums/media-type.enum';
@Entity({ name: 'media' })
@Index('idx_media_user_id', ['userId'])
export class MediaEntity extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  url!: string;

  @Column({ nullable: false, type: 'text' })
  fileName!: string;

  @Column({ nullable: false, type: 'enum', enum: MediaMimeType })
  mimeType!: MediaMimeType;

  @Column({ nullable: false, type: 'enum', enum: MediaSourceType })
  sourceType!: MediaSourceType;

  @Column({ nullable: false, type: 'uuid' })
  userId!: string;
}
