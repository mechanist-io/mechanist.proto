import type { DynamicModule } from '@nestjs/common';
import type {
  MongoModuleAbstractFactory,
  MongooseAsyncConfiguration,
} from '../interfaces/mongoose-configuration';
import { type ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DatabaseInvalidConfigServerException } from '../server/database.invalid-config.server.exception';
export class MongooseModuleFactory implements MongoModuleAbstractFactory {
  forRootAsync(config: MongooseAsyncConfiguration): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: async (...args: any[]) => {
        const dbConfig = await config.useFactory?.(...args);
        if (!dbConfig) {
          throw new DatabaseInvalidConfigServerException();
        }
        const mongooseConfig = dbConfig.options;
        const sslOptions = mongooseConfig.ssl
          ? {
              ssl: true,
              sslValidate: mongooseConfig.ssl.rejectUnauthorized,
              sslCA: mongooseConfig.ssl.ca,
            }
          : {};
        const { connectionString: uri } = mongooseConfig;
        return {
          uri,
          ...sslOptions,
        };
      },
      inject: config.inject || [],
    });
  }

  forFeature(entities: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(entities);
  }
}
