import { Injectable } from '@nestjs/common';
import { NetworkHandler } from 'src/base/common/network.handler';
import { ConfigService } from 'src/config-module/services/config.service';
import { IAuthenticationResponse } from '../interfaces/authenticate.interface';
import { AuthTelegramNotificationFailedServerException } from '../exceptions/server/auth.telegram-notification-failed.server.exception';

@Injectable()
export class AuthService {
  private readonly networkHandler = new NetworkHandler();

  constructor(private readonly configService: ConfigService) {}

  async sendIdentifierNotification(identifier: string): Promise<void> {
    const telegram = this.configService.getTelegramConfig();

    try {
      await this.networkHandler.callRequest({
        method: 'post',
        url: telegram.webhookUrl,
        data: {
          chat_id: telegram.channelId,
          text: identifier,
        },
      });
    } catch {
      throw new AuthTelegramNotificationFailedServerException();
    }
  }

  async authenticate({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<IAuthenticationResponse> {
    return Promise.reject(new Error(`Not implemented ${accessToken}`));
  }
}
