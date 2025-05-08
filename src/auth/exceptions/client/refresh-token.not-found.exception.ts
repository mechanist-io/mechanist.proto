import { ClientException } from 'src/base/exceptions/http/client.exception';

export class RefreshTokenNotFoundException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'Refresh token not found',
        identifier: 'auth.refreshTokenNotFound',
      },
      statusCode: 401,
    });
  }
}
