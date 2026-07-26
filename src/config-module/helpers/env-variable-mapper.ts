/* eslint-disable */
import { IConfig } from '../interfaces/config.interface';

// TODO: mechanist.backend fix this
const title = 'Mechanist Backend';
const description = 'Mechanist API Documentation';

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
    mongooseDatabase: {
      connectionString: env.DATABASE_CONNECTION_STRING || '',
      ssl:
        env.DATABASE_SSL_ON === 'true'
          ? {
              ca: env.DATABASE_SSL_CA_PATH || `${process.cwd()}/db.crt`,
              rejectUnauthorized:
                env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
            }
          : false,
    },
    telegram: {
      webhookUrl: env.TELEGRAM_CRITICAL_ERROR_WEBHOOK!,
      channelId: env.TELEGRAM_CHANNEL_ID!,
    },
    validations: {},
  };
}

export function getParam(name: string): string | undefined {
  return process.env[name];
}
