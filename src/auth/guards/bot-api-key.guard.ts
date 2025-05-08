import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import { AuthInvalidAPIKeyException } from '../exceptions/client/auth.invalid-api-key.exception';

@Injectable()
export class BotsApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if (apiKey === this.configService.getAuthConfig().OFFICIAL_BOT_API_KEY) {
      return true;
    }

    throw new AuthInvalidAPIKeyException();
  }
}
