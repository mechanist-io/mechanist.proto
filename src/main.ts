import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import './base/helpers/load-config.helper';
import { AppModule } from './app.module';
import { getConfiguration } from './config-module/helpers/env-variable-mapper';
import { swaggerConfiguration } from './base/helpers/swagger.helper';
import { HttpExceptionFilter } from './base/exceptions/http/http.exception-filter';
import validationOptions from './base/common/validation-options';

async function bootstrap() {
  const PORT = getConfiguration().core.port || 9000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'OPTIONS') {
      next();
      return;
    }

    const { origin } = req.headers;

    if (origin !== undefined) {
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
