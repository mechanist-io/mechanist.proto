import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/services/config.service';
import { AuthUnauthorizedClientException } from '../exceptions/client/unauthorized.client.exception';

@Injectable()
export class BotsApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if (apiKey === this.configService.getEnv('OFFICIAL_BOT_API_KEY')) {
      return true;
    }

    throw new AuthUnauthorizedClientException({
      message: 'Invalid API key',
    });
  }
}
