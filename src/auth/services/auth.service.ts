import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
// import { Logger } from 'src/base/common/logger';
// import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  // private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    // private readonly redis: RedisService,
  ) {}

// TODO: algo-boilerplate -> add your methods here
}
