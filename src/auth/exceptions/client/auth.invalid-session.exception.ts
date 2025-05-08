import { ClientException } from 'src/base/exceptions/http/client.exception';

export class InvalidSessionException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'Invalid session',
        identifier: 'auth.invalidSession',
      },
      statusCode: 401,
    });
  }
}
