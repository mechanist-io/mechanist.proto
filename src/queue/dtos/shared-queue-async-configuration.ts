import type { FactoryProvider } from '@nestjs/common';

export interface SharedQueueAsyncConfiguration {
  useFactory?: (
    ...args: any[]
  ) => Promise<QueueConfiguration> | QueueConfiguration;
  inject?: FactoryProvider['inject'];
}

export type QueueConfiguration = RedisQueueConfiguration;

export interface CommonQueueConfiguration {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  maxRetriesPerRequest?: number;
}

export interface RedisQueueConfiguration {
  redis: CommonQueueConfiguration;
}

export interface QueueModuleOptions {
  options: {
    removeOnComplete: boolean;
    removeOnFail: boolean;
    attempts: number;
  };
  name: string;
}
