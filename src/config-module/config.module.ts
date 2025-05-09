import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './services/config.service';
import { validateConfiguration } from './helpers/validation';

@Module({})
@Global()
export class ConfigurationModule {
  static register(): DynamicModule {
    const module: DynamicModule = {
      module: ConfigurationModule,
      imports: [
        ConfigModule.forRoot({
          validate: validateConfiguration,
          isGlobal: true,
        }),
      ],
      controllers: [],
      providers: [ConfigService],
      exports: [ConfigService],
    };

    return module;
  }
}
