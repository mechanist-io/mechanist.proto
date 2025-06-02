import { BullModule } from '@nestjs/bull';
import type { DynamicModule } from '@nestjs/common';
import type {
  QueueModuleOptions,
  SharedQueueAsyncConfiguration,
} from './dtos/shared-queue-async-configuration';

export class QueueModule {
  static register(config: QueueModuleOptions): DynamicModule {
    const module: DynamicModule = BullModule.registerQueueAsync({
      // TODO: algo-boilerplate -> add your queue name here
      name: 'example',
      useFactory: () => ({
        defaultJobOptions: config.options,
      }),
    });

    return module;
  }

  static forRootAsync(config: SharedQueueAsyncConfiguration): DynamicModule {
    return BullModule.forRootAsync({
      useFactory: async (...args: any[]) => {
        const queueConfig = await config.useFactory?.(...args);
        return {
          redis: queueConfig?.redis,
        };
      },
      inject: config.inject ?? [],
    });
  }
}
