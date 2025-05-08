import { ClientException } from 'src/base/exceptions/http/client.exception';

export class SessionNotFoundException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'Session not found',
        identifier: 'auth.sessionNotFound',
      },
    });
  }
}
