import { ClientException } from './client.exception';

export class ValidationRequestException extends ClientException {
  constructor({
    information,
  }: {
    information: { message: string; identifier: string };
  }) {
    super({
      information,
      statusCode: 400,
    });
  }
}
