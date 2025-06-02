import { Injectable } from '@nestjs/common';
import {
  DeleteMediaRequestDto,
  FindOneMediaRequestDto,
} from '../dtos/service/requests/find-media.request.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'uuidjs';
import { FileService } from 'src/file/services/file.service';
import { ParallelQueryHandler } from 'src/base/common/parallel-query.handler';
import { extractFileType } from 'src/base/common/extract-file-type';
import { MediaSourceType } from 'src/base/enums/media-type.enum';
import { CreateAvatarMediaResponseDto } from '../dtos/service/responses/create-avatar-media.response.dto';
import { CreateMediaRequestDto } from '../dtos/service/requests/create-avatar-media.request.dto';
import { MediaNotFoundException } from '../exceptions/client/media-not-found.client.exception';
import { MediaEntity } from '../entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    private readonly fileService: FileService,

    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async create(
    dto: CreateMediaRequestDto,
  ): Promise<CreateAvatarMediaResponseDto> {
    const fileName = UUID.genV6().hexNoDelim;
    const filePath = `${extractFileType(dto.mimeType)}/${new Date().getFullYear()}/users/${dto.userId}/avatar/${fileName}`;
    const { url, fields } = await this.fileService.createS3PresignedUploadUrl({
      key: filePath,
      mimeType: dto.mimeType,
      userId: dto.userId,
    });

    const media = await this.mediaRepository.save(
      this.mediaRepository.create({
        fileName,
        userId: dto.userId,
        url: `${url}/${fields.key}`,
        mimeType: dto.mimeType,
        sourceType: MediaSourceType.AMAZON_S3,
      }),
    );

    return {
      media,
      uploadUrl: url,
      fields,
    };
  }

  async findOne(dto: FindOneMediaRequestDto): Promise<MediaEntity> {
    const media = await this.mediaRepository.findOneBy({
      id: dto.id,
      ...(dto.userId && { userId: dto.userId }),
    });

    if (!media) {
      throw new MediaNotFoundException();
    }
    return media;
  }

  async deleteExpiredMedia(): Promise<void> {
    // const mediaItems = await this.mediaRepository.find({
    //   where: {
    //     postId: IsNull(),
    //     createdAt: MoreThanOrEqual(new Date(Date.now() - 24 * 60 * 60 * 1000))
    //   }
    // });
    //TODO: also remove from the s3 bucket. maybe they uploaded but never called the API to create a post.
    // await this.mediaRepository.remove();
  }

  async delete(dto: DeleteMediaRequestDto): Promise<void> {
    const mediaItems = await this.mediaRepository.findBy({
      ...(dto.id ? { id: dto.id } : {}),
      userId: dto.userId,
    });

    if (mediaItems.length === 0) {
      throw new MediaNotFoundException();
    }

    const queries = new ParallelQueryHandler(MediaService.name);

    queries.addMany({
      queryHandlers: mediaItems.map((media) => {
        const filePath = `${extractFileType(media.mimeType)}/${new Date().getFullYear()}/users/${dto.userId}/avatar/${media.fileName}`;
        return this.fileService.deleteS3File({ key: filePath });
      }),
      metadata: 'delete.media.items',
    });

    await queries.execute();

    await this.mediaRepository.delete({
      ...(dto.id ? { id: dto.id } : {}),
      userId: dto.userId,
    });
  }
}
