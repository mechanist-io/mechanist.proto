import { BullModule } from '@nestjs/bull';
import { DynamicModule } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import {
  QueueModuleOptions,
  SharedQueueAsyncConfiguration,
} from './dtos/shared-queue-async-configuration';

export class QueueModule {
  static register(config: QueueModuleOptions): DynamicModule {
    const module: DynamicModule = BullModule.registerQueueAsync({
      name: ConfigService.getRecommendationConfig().queue.name,
      useFactory: async () => ({
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
      inject: config.inject || [],
    });
  }
}
