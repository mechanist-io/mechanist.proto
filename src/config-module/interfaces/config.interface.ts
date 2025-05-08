import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IApiConfig } from './api.interface';
import { ICoreConfig } from './core.interface';
import { INetworkConfig } from './network.interface';
import { IFileStorage } from './s3.interface';
import { SmsProviderConfig } from './sms-provider.interface';
import { TwilioInterface } from './twilio.interface';
import { VaultInterface } from './vault.interface';
import { WalletInterface } from './wallet.interface';
import { AuthInterface } from './auth.interface';
import { IValidationConfig } from './validation.interface';
import { IRecommendationConfig } from './recommendation.interface';
import { IRedisConfig } from './redis.interface';

export interface IConfig {
  core: ICoreConfig;
  api: IApiConfig;
  database: TypeOrmModuleOptions;
  twilio: TwilioInterface;
  auth: AuthInterface;
  vault: VaultInterface;
  wallet: WalletInterface;
  smsProvider: SmsProviderConfig;
  fileStorage: IFileStorage;
  network: INetworkConfig;
  validations: IValidationConfig;
  recommendation: IRecommendationConfig;
  redis: IRedisConfig;
}
