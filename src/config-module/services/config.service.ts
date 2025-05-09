import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { getConfiguration, getParam } from '../helpers/env-variable-mapper';
import { IConfig } from '../interfaces/config.interface';
import { ICoreConfig } from '../interfaces/core.interface';
import { IFileStorage } from '../interfaces/s3.interface';
import { IValidationConfig } from '../interfaces/validation.interface';
import { IApiConfig } from '../interfaces/api.interface';
import { IRedisConfig } from '../interfaces/redis.interface';

@Injectable()
export class ConfigService {
  private static _config: IConfig | null = null;

  getCoreConfig(): ICoreConfig {
    const config = ConfigService.getConfigs();

    return config.core;
  }

  getDatabaseConfig(): TypeOrmModuleOptions {
    const config = ConfigService.getConfigs();

    return config.database;
  }

  getApiConfig(): IApiConfig {
    const config = ConfigService.getConfigs();

    return config.api;
  }

  getEnv<T = string>(name: string): T | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const param = getParam(name) as any;
    if (!param) {
      return null;
    }

    return param as T;
  }

  getRedisConfig(): IRedisConfig {
    const config = ConfigService.getConfigs();

    return config.redis;
  }

  getFileStorageConfig(): IFileStorage {
    const config = ConfigService.getConfigs();

    return config.fileStorage;
  }

  // TODO: we should remove this
  getConfigs(): IConfig {
    if (!ConfigService._config) {
      ConfigService._config = getConfiguration();
    }

    return ConfigService._config!;
  }

  static resetConfig(): void {
    ConfigService._config = null;
  }

  static getValidationsConfig(): IValidationConfig {
    const config = ConfigService.getConfigs();

    return config.validations;
  }

  getValidationsConfig(): IValidationConfig {
    return ConfigService.getValidationsConfig();
  }

  private static getConfigs(): IConfig {
    if (!ConfigService._config) {
      ConfigService._config = getConfiguration();
    }
    return ConfigService._config!;
  }
}
