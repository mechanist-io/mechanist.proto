import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  DATABASE_CONNECTION_STRING!: string;

  @IsOptional()
  @IsString()
  DATABASE_SSL_ON!: string;

  @IsOptional()
  @IsString()
  DATABASE_SSL_CA_PATH!: string;

  @IsOptional()
  @IsString()
  DATABASE_SSL_REJECT_UNAUTHORIZED!: string;

  @IsString()
  @IsNotEmpty()
  TELEGRAM_CRITICAL_ERROR_WEBHOOK!: string;

  @IsString()
  @IsNotEmpty()
  TELEGRAM_CHANNEL_ID!: string;

  /* Allow any other ENV */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  [key: string]: any | undefined;
}
