import { ClientException } from 'src/base/exceptions/http/client.exception';

export class AuthInvalidAPIKeyException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'Invalid API key',
        identifier: 'auth.invalidApiKey',
      },
      statusCode: 401,
    });
  }
}
