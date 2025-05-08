import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { MediaMimeType } from 'src/base/enums/media-type.enum';

export class CreateMediaRequestRestDto {
  @ApiProperty({ enum: MediaMimeType, example: Object.values(MediaMimeType) })
  @IsNotEmpty()
  @IsEnum(MediaMimeType)
  mimeType: MediaMimeType;
}
