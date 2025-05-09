import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { Injectable } from '@nestjs/common';
import { CreateMediaPresignedUploadUrlDto } from '../dtos/service/requests/create-post-media-presigned-upload-url.dto';
import { Logger } from 'src/base/common/logger';
import { ConfigService } from 'src/config-module/services/config.service';

@Injectable()
export class FileService {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger('FileService');

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId:
          this.configService.getFileStorageConfig().S3_BUCKET_ACCESS_KEY_ID,
        secretAccessKey:
          this.configService.getFileStorageConfig().S3_BUCKET_SECRET_ACCESS_KEY,
      },
      region: this.configService.getFileStorageConfig().S3_BUCKET_REGION,
      forcePathStyle: true,
    });
  }

  async createS3PresignedUploadUrl(
    dto: CreateMediaPresignedUploadUrlDto,
  ): Promise<{ url: string; fields: Record<string, string> }> {
    const { url, fields } = await createPresignedPost(this.s3Client, {
      Bucket: this.configService.getFileStorageConfig().S3_BUCKET_NAME,
      Key: dto.key,
      Expires: 15 * 60,
      Fields: {
        acl: 'public-read',
        'Content-Type': dto.mimeType,
        key: dto.key,
      },
      Conditions: [
        { acl: 'public-read' },
        ['starts-with', '$Content-Type', dto.mimeType],
        [
          'content-length-range',
          1,
          this.configService.getFileStorageConfig().POST_MEDIA_SIZE_LIMIT_MB *
            1000 *
            1000,
        ],
      ],
    });

    return {
      url,
      fields,
    };
  }

  async deleteS3File({ key }: { key: string }) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    await this.s3Client.send(command);
    this.logger.log(
      {
        message: `Deleted file from S3 bucket`,
        info: { key },
      },
      this.deleteS3File.name,
    );
  }
}
