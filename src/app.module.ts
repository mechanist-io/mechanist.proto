import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config-module/config.module';
import { ConfigService } from './config-module/config.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { LoggerInterceptor } from './base/interceptors/logger.interceptor';
import { GlobalServicesModule } from './global-module/global-services.module';
import { FileModule } from './file/file.module';

import { QueueModule } from './queue/queue.module';
import { RedisModule } from './redis/redis.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigurationModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) =>
        configService.getDatabaseConfig(),
      inject: [ConfigService],
    }),
    QueueModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.getRedisConfig(),
      }),
    }),
    GlobalServicesModule.register(
      [],
      [AuthModule, RedisModule],
    ),
    HealthCheckModule,
    FileModule,
    MediaModule,
    RedisModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class AppModule {}
