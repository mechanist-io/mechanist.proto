import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
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
    'http://localhost:3000',
    'https://localhost:3000',
    'https://mechanist.ir',
  ];
}

function isOriginAllowed(origin: string | undefined, allowedOrigins: string[]): boolean {
  if (origin === undefined || origin.length === 0) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

async function bootstrap() {
  const PORT = getConfiguration().core.port || 9000;
  const allowedOrigins = getCorsOrigins();
  const app = await NestFactory.create(AppModule);

  Logger.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`, 'Bootstrap');

  app.enableCors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin, allowedOrigins)) {
        callback(null, origin ?? true);
        return;
      }

      Logger.warn(`CORS blocked origin: ${origin}`, 'Bootstrap');
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'OPTIONS') {
      next();
      return;
    }

    const origin = req.headers.origin as string | undefined;

    if (isOriginAllowed(origin, allowedOrigins) && origin !== undefined) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept',
    );
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(204).end();
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
