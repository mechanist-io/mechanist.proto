import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config-module/config.module';
// import { ConfigService } from './config-module/services/config.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { LoggerInterceptor } from './base/interceptors/logger.interceptor';
import { GlobalServicesModule } from './global-module/global-services.module';
// import { MongoDBWrapperModule } from './database/mongoose/database.module';

@Module({
  imports: [
    ConfigurationModule.register(),
    // MongoDBWrapperModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     options: configService.getMongooseDatabaseConfig(),
    //   }),
    // }),
    GlobalServicesModule.register([], [AuthModule]),
    HealthCheckModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class AppModule {}
