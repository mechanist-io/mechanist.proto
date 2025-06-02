import {
  type INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import type * as request from 'supertest';
import { Test, type TestingModule } from '@nestjs/testing';
import { type ObjectLiteral, type Repository } from 'typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as pg from 'pg';
import { getConfiguration } from 'src/config-module/helpers/env-variable-mapper';
import { ConfigService } from 'src/config-module/services/config.service';
import { MediaEntity } from 'src/media/entities/media.entity';
import { RedisService } from 'src/redis/services/redis.service';
import { AppModule } from 'src/app.module';

let sharedApp: INestApplication | undefined = undefined;

export async function getSharedApp(): Promise<INestApplication> {
  if (sharedApp !== undefined) {
    return sharedApp;
  }

  ConfigService.resetConfig();
  const PORT = getConfiguration().core.port || 9000;

  pg.defaults.parseInputDatesAsUTC = true;
  pg.types.setTypeParser(
    1114,
    (stringValue: string) => new Date(`${stringValue}Z`),
  );
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.enableCors({
    origin: [
      'http://localhost:9001',
      'https://localhost:9001',
      'http://localhost:9000',
      'https://localhost:9000',
    ],

    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(PORT, () => {});
  sharedApp = app;
  return sharedApp;
}

export async function closeSharedApp() {
  if (sharedApp === undefined) {
    return;
  }

  await sharedApp.close();

  sharedApp = undefined;
}

export function getRepository<T extends ObjectLiteral>(
  app: INestApplication,
  entity: EntityClassOrSchema,
): Repository<T> {
  const repository = app.get<Repository<T>>(getRepositoryToken(entity));
  return repository;
}

export async function cleanUpDatabaseAndReSeed(app: INestApplication) {
  await cleanUpDatabaseAndRedis(app);

  // TODO: algo-boilerplate -> seed your database here
}

export async function cleanUpDatabase(app: INestApplication) {
  const { manager } = getRepository(app, MediaEntity);
  await manager.transaction(async (transactionalEntityManager) => {
    const removeTablesQuery = [
      // TODO: algo-boilerplate -> add your tables here
      transactionalEntityManager.getRepository(MediaEntity),
    ].map((repository) =>
      repository.query(`DELETE from ${repository.metadata.tableName}`),
    );

    await Promise.all(removeTablesQuery);
  });
}

export async function cleanUpDatabaseAndRedis(app: INestApplication) {
  await cleanUpDatabase(app);
  await resetRedis(app);
}
export async function tearDownTest(app: INestApplication) {
  await resetRedis(app);
  await cleanUpDatabaseAndReSeed(app);
  await closeSharedApp();
}

export async function resetRedis(app: INestApplication) {
  const redisService = app.get(RedisService);
  const redisClient = (redisService as any).redis;

  if (!redisClient) {
    throw new Error('Redis client not found in RedisService');
  }

  await redisClient.flushall(); // deletes all keys from Redis
}

export function extractTokensFromResponse(response: request.Response) {
  const { accessToken } = response.body;
  const { refreshToken } = response.body;
  return { accessToken, refreshToken };
}

export function logResponse(response: request.Response) {
  return {
    ifStatusIsNot: (status: number) => {
      if (response.status !== status) {
        console.error({
          message: 'Response status is not as expected',
          status: response.status,
          body: JSON.stringify(response.body),
          request: {
            url: response.request.url,
            method: response.request.method,
            body: JSON.stringify((response.request as any)._data),
          },
        });
      }
    },
  };
}
