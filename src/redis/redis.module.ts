import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from 'src/config-module/services/config.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        options: {
          host: configService.getRedisConfig().host,
          port: configService.getRedisConfig().port,
          username: configService.getRedisConfig().username,
          password: configService.getRedisConfig().password,
          db: configService.getRedisConfig().db,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
