import { ClientException } from 'src/base/exceptions/http/client.exception';

export class AuthUnauthorizedClientException extends ClientException {
  constructor(dto: { message: string }) {
    super({
      information: {
        message: dto.message,
        identifier: 'auth.unauthorized',
      },
      statusCode: 401,
    });
  }
}
