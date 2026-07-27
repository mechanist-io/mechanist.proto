import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import './base/helpers/load-config.helper';
import { AppModule } from './app.module';
import { getConfiguration } from './config-module/helpers/env-variable-mapper';
import { swaggerConfiguration } from './base/helpers/swagger.helper';
import { HttpExceptionFilter } from './base/exceptions/http/http.exception-filter';
import validationOptions from './base/common/validation-options';

function getCorsOrigins(): string[] {
  const configuredOrigins = process.env.CORS_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configuredOrigins !== undefined && configuredOrigins.length > 0) {
    return configuredOrigins;
  }

  return [
    'http://localhost:9000',
    'https://localhost:9000',
    'http://localhost:9001',
    'https://localhost:9001',
  ];
}

async function bootstrap() {
  const PORT = getConfiguration().core.port || 9000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: getCorsOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  swaggerConfiguration(app);
  await app.listen(PORT, () => {
    Logger.log(`Swagger path (WEB): http://localhost:${PORT}/docs`);
    Logger.log(`Swagger path (JSON): http://localhost:${PORT}/api-json`);
  });
}

bootstrap();
