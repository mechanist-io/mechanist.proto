import type { DynamicModule } from '@nestjs/common';
import type {
  EntityType,
  MongooseAsyncConfiguration,
} from './interfaces/mongoose-configuration';
import { MongooseModuleFactory } from './factories/mongoose-module.factory';

export class MongoDBWrapperModule {
  static forRootAsync(config: MongooseAsyncConfiguration): DynamicModule {
    return new MongooseModuleFactory().forRootAsync(config);
  }

  static forFeature(entities: EntityType[]): DynamicModule {
    return new MongooseModuleFactory().forFeature(entities);
  }
}
