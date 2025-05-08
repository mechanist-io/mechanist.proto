export enum ImageMimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
}

export enum VideoMimeType {
  MP4 = 'video/mp4',
  MKV = 'video/x-matroska',
  MOV = 'video/quicktime',
  AVI = 'video/x-msvideo',
}

export enum AudioMimeType {
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  M4A = 'audio/m4a',
}

// Recreate MediaMimeType as a union of the other enums
export const MediaMimeType = {
  ...ImageMimeType,
  ...VideoMimeType,
  ...AudioMimeType,
} as const;

export type MediaMimeType = (typeof MediaMimeType)[keyof typeof MediaMimeType];

export enum MediaSourceType {
  AMAZON_S3 = 'amazon_s3',
}
