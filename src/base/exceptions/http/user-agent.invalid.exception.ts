import { ClientException } from './client.exception';

export class InvalidUserAgentException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'User Agent is invalid',
        identifier: 'userAgent.invalid',
      },
    });
  }
}
