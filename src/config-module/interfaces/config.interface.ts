import type { MongooseConnectionStringConfiguration } from '../../database/mongoose/interfaces/mongoose-configuration';

import type { IApiConfig } from './api.interface';
import type { ICoreConfig } from './core.interface';
import type { ITelegramConfig } from './telegram.interface';
import type { IValidationConfig } from './validation.interface';

export interface IConfig {
  core: ICoreConfig;
  api: IApiConfig;
  mongooseDatabase: MongooseConnectionStringConfiguration;
  telegram: ITelegramConfig;
  validations: IValidationConfig;
}
