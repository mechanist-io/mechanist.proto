/* eslint-disable */
import path from 'path';
import { readFileSync } from 'fs';
import { IConfig } from '../interfaces/config.interface';

// TODO: algo-boilerplate fix this
const title = 'Boilerplate Service';
const description = 'Boilerplate API Documentation';

export function getConfiguration(): IConfig {
  const env = process.env;
  return {
    core: {
      env: env.ENV?.length ? env.ENV : 'development',
      port: Number(env.PORT) || 9000,
      host: env.HOST || '127.0.0.1',
      platformUserId: env.PLATFORM_USER_ID!,
    },
    api: {
      version: 'v1',
      globalPrefix: 'api',
      enabled: env.SWAGGER_ENABLED?.length
        ? JSON.parse(env.SWAGGER_ENABLED)
        : true,
      title,
      description,
      path: env.SWAGGER_PATH || `/api`,
    },
    redis: {
      host: env.REDIS_HOST!,
      port: +env.REDIS_PORT!,
      db: +env.REDIS_DB!,
      username: env.REDIS_USERNAME!,
      password: env.REDIS_PASSWORD!,
      maxRetriesPerRequest: 3,
    },
    database: {
      type: env.TYPEORM_TYPE as any,
      host: env.TYPEORM_HOST!,
      port: +env.TYPEORM_PORT!,
      username: env.TYPEORM_USERNAME!,
      password: env.TYPEORM_PASSWORD!,
      database: env.TYPEORM_DATABASE!,
      entities: [__dirname + '/../../**/entities/*.entity.{ts,js}'],
      synchronize: env.TYPEORM_SYNC?.toLowerCase() === 'true' ? true : false,
      logging: false,
      extra: {
        idleTimeoutMillis: 30000, // close idle connections after 30 seconds
      },
      ssl:
        env.TYPEORM_SSL_ON === 'true'
          ? {
              ca: readFileSync(
                env.TYPEORM_SSL_CA_PATH || path.join(process.cwd(), 'db.crt'),
              ),
              rejectUnauthorized:
                env.TYPEORM_SSL_REJECT_UNAUTHORIZED === 'true',
            }
          : false,
    },
    fileStorage: {
      S3_BUCKET_ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID || '',
      S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
      S3_BUCKET_REGION: process.env.S3_BUCKET_REGION || '',
      S3_BUCKET_SECRET_ACCESS_KEY:
        process.env.S3_BUCKET_SECRET_ACCESS_KEY || '',
      POST_MEDIA_SIZE_LIMIT_MB: +process.env.POST_MEDIA_SIZE_LIMIT_MB!,
    },

    validations: {},
  };
}

export function getParam(name: string): string | undefined {
  return process.env[name];
}
