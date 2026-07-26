import { ServerException } from 'src/base/exceptions/http/server.exception';

export class DatabaseInvalidConfigServerException extends ServerException {
  constructor() {
    super({
      information: {
        message: 'Invalid database configuration',
        identifier: 'database.invalidConfig',
      },
    });
  }
}
