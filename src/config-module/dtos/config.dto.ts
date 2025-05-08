import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ConfigDto {
  @IsOptional()
  @IsNumber()
  PORT!: number;

  @IsOptional()
  @IsString()
  HOST!: string;

  /* API */
  @IsOptional()
  @IsString()
  SWAGGER_PATH!: string;

  /* Database typeorm */
  @IsString()
  @IsNotEmpty()
  TYPEORM_TYPE!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  TYPEORM_PORT!: number;

  @IsString()
  @IsNotEmpty()
  TYPEORM_DATABASE!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_SYNC!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_SSL_ON!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_SSL_CA_PATH!: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_SSL_REJECT_UNAUTHORIZED!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_PORT!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_DB!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_PASSWORD!: string;

  // AWS S3 Bucket
  @IsString()
  @IsNotEmpty()
  S3_BUCKET_NAME!: string;

  @IsString()
  @IsNotEmpty()
  S3_BUCKET_REGION!: string;

  @IsString()
  @IsNotEmpty()
  S3_BUCKET_ACCESS_KEY_ID!: string;

  @IsString()
  @IsNotEmpty()
  S3_BUCKET_SECRET_ACCESS_KEY!: string;

  /* Allow any other ENV */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  [key: string]: any | undefined;

  @IsString()
  @IsNotEmpty()
  OFFICIAL_BOT_API_KEY: string;
}
