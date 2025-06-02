import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import type { IApiConfig } from './api.interface';
import type { ICoreConfig } from './core.interface';
import type { IFileStorage } from './s3.interface';
import type { IValidationConfig } from './validation.interface';
import type { IRedisConfig } from './redis.interface';

export interface IConfig {
  core: ICoreConfig;
  api: IApiConfig;
  database: TypeOrmModuleOptions;
  fileStorage: IFileStorage;
  validations: IValidationConfig;
  redis: IRedisConfig;
}
