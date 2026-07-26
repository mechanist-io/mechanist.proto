import { Injectable } from '@nestjs/common';
import { MongooseConnectionStringConfiguration } from '../../database/mongoose/interfaces/mongoose-configuration';

import { getConfiguration, getParam } from '../helpers/env-variable-mapper';
import { IConfig } from '../interfaces/config.interface';
import { ICoreConfig } from '../interfaces/core.interface';
import { IValidationConfig } from '../interfaces/validation.interface';
import { IApiConfig } from '../interfaces/api.interface';
import { ITelegramConfig } from '../interfaces/telegram.interface';

@Injectable()
export class ConfigService {
  private static _config: IConfig | null = null;

  getCoreConfig(): ICoreConfig {
    const config = ConfigService.getConfigs();

    return config.core;
  }

  getMongooseDatabaseConfig(): MongooseConnectionStringConfiguration {
    const config = ConfigService.getConfigs();

    return config.mongooseDatabase;
  }

  getApiConfig(): IApiConfig {
    const config = ConfigService.getConfigs();

    return config.api;
  }

  getTelegramConfig(): ITelegramConfig {
    const config = ConfigService.getConfigs();

    return config.telegram;
  }

  getEnv<T = string>(name: string): T | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const param = getParam(name) as any;
    if (!param) {
      return null;
    }

    return param as T;
  }

  // TODO: we should remove this
  getConfigs(): IConfig {
    if (!ConfigService._config) {
      ConfigService._config = getConfiguration();
    }

    return ConfigService._config;
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
    return ConfigService._config;
  }
}
