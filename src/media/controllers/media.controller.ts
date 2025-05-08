import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { CurrentUser } from 'src/base/decorators/current-user.decorator';
import { Protected } from 'src/base/decorators/protection.decorator';
import { CreateMediaRequestRestDto } from '../dtos/controller/requests/create-media.request.rest.dto';
import { MediaResponseRestDto } from '../dtos/controller/response/media.response.rest.dto';
import { MediaService } from '../services/media.service';

@Controller()
@ApiTags('Media')
export class MediaController {
  constructor(
    private readonly avatarService: MediaService,
  ) {}

  @Version('2')
  @Post('media/s3-presigned-upload-url')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'create a presigned URL for uploading posts media to the S3 bucket. This endpoint is used to create a presigned URL for uploading media to the S3 bucket.',
  })
  @Protected()
  async createPostMedia(
    @CurrentUser() user: JwtPayloadInterface,
    @Body() dto: CreateMediaRequestRestDto,
  ): Promise<MediaResponseRestDto> {
    const result = await this.avatarService.create({
      mimeType: dto.mimeType,
      userId: user.sub,
    });

    return new MediaResponseRestDto(result.media, {
      uploadUrl: result.uploadUrl,
      fields: result.fields,
    });
  }

}
