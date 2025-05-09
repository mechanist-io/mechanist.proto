import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { readFileSync } from 'fs';
import 'src/base/helpers/load-config.helper';
// this file will use in pipeline
// checkout package.json > migration:XX for more information
// TODO: algo-boilerplate -> you need to verify this file

const env = process.env;

export const AppDataSource = new DataSource({
  type: env.TYPEORM_TYPE as any,
  host: env.TYPEORM_HOST,
  port: +env.TYPEORM_PORT!,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  synchronize: env.TYPEORM_SYNC?.toLowerCase() === 'true' ? true : false,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: env.NODE_ENV !== 'production',
  ssl:
    env.TYPEORM_SSL_ON === 'true' && env.TYPEORM_SSL_CA_PATH
      ? {
          ca: readFileSync(env.TYPEORM_SSL_CA_PATH),
          rejectUnauthorized: env.TYPEORM_SSL_REJECT_UNAUTHORIZED === 'true',
        }
      : false,
  entities: [__dirname + '/../../src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: '/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
