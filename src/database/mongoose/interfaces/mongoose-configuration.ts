import type { DynamicModule, FactoryProvider } from '@nestjs/common';
import type { ModelDefinition } from '@nestjs/mongoose';

export interface MongooseAsyncConfiguration {
  useFactory: (
    ...args: any[]
  ) => Promise<MongooseConfiguration> | MongooseConfiguration;
  inject?: FactoryProvider['inject'];
}

export interface MongooseConfiguration {
  options: MongooseConnectionStringConfiguration;
}

export interface MongooseConnectionStringConfiguration {
  connectionString: string;
  ssl:
    | {
        ca: string;
        rejectUnauthorized: boolean;
      }
    | false;
}
export type EntityType = ModelDefinition;

export interface MongoModuleAbstractFactory {
  forRootAsync(config: MongooseAsyncConfiguration): DynamicModule;
  forFeature(entities: EntityType[]): DynamicModule;
}
