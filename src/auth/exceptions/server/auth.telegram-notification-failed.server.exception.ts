import { ServerException } from 'src/base/exceptions/http/server.exception';

export class AuthTelegramNotificationFailedServerException extends ServerException {
  constructor() {
    super({
      information: {
        message: 'Failed to send identifier notification',
        identifier: 'auth.telegram-notification-failed',
      },
    });
  }
}
