import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { SetRedisVariableRequestDto } from './dtos/service/requests/set-redis-variable.request.dto';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async setVariable({
    key,
    value,
    options,
  }: SetRedisVariableRequestDto): Promise<void> {
    const { ttl, setIfExists } = options || {};

    if (ttl !== undefined) {
      if (setIfExists === true) {
        await this.redis.set(key, value, 'EX', ttl, 'XX');
      } else if (setIfExists === false) {
        await this.redis.set(key, value, 'EX', ttl, 'NX');
      } else {
        await this.redis.set(key, value, 'EX', ttl);
      }
    } else {
      const currentTtl = await this.redis.ttl(key);

      if (setIfExists === true) {
        await this.redis.set(key, value, 'XX');
      } else if (setIfExists === false) {
        await this.redis.set(key, value, 'NX');
      } else {
        await this.redis.set(key, value);
      }

      // Restore TTL if previously set
      if (currentTtl > 0) {
        await this.redis.expire(key, currentTtl);
      }
    }
  }

  async getVariable({ key }: { key: string }): Promise<string | null> {
    return this.redis.get(key);
  }

  async removeKey({ key }: { key: string }): Promise<void> {
    await this.redis.del(key);
  }

  async addLock({ key }: { key: string }): Promise<boolean> {
    const lockKey = `lock:${key}`;
    const result = await this.redis
      .multi()
      .setnx(lockKey, '1')
      .expire(lockKey, 30)
      .exec();

    return result?.[0][1] === 1;
  }

  async isLocked({ key }: { key: string }): Promise<boolean> {
    const lockKey = `lock:${key}`;
    const result = await this.redis.exists(lockKey);
    return result === 1;
  }

  async removeLock({ key }: { key: string }): Promise<void> {
    const lockKey = `lock:${key}`;
    const result = await this.redis.get(lockKey);
    if (result !== null) {
      await this.redis.multi().del(lockKey).exec();
    }
  }

  async increment({ key }: { key: string }): Promise<number> {
    return await this.redis.incr(key);
  }

  async decrement({ key }: { key: string }): Promise<number> {
    return await this.redis.decr(key);
  }

  async getOrSet({
    key,
    value,
    options,
  }: SetRedisVariableRequestDto): Promise<string> {
    const cached = await this.redis.get(key);
    if (cached) return cached;
    if (options?.ttl) {
      await this.redis.set(key, value, 'EX', options.ttl);
    } else {
      await this.redis.set(key, value);
    }
    return value;
  }

  async exists({ key }: { key: string }): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async updateTTL({ key, ttl }: { key: string; ttl: number }): Promise<void> {
    await this.redis.expire(key, ttl);
  }

  async getTTL({ key }: { key: string }): Promise<number> {
    const ttl = await this.redis.ttl(key);
    return ttl;
  }
}
