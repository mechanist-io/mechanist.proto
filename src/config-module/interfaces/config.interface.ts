import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IApiConfig } from './api.interface';
import { ICoreConfig } from './core.interface';
import { IFileStorage } from './s3.interface';
import { IValidationConfig } from './validation.interface';
import { IRedisConfig } from './redis.interface';

export interface IConfig {
  core: ICoreConfig;
  api: IApiConfig;
  database: TypeOrmModuleOptions;
  fileStorage: IFileStorage;
  validations: IValidationConfig;
  redis: IRedisConfig;
}
