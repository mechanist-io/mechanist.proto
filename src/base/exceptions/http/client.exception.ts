import { BadRequestException, HttpStatus } from '@nestjs/common';

interface ClientExceptionOptions {
  information: {
    message: string;
    identifier: string;
  };
  statusCode?: HttpStatus;
}

export class ClientException extends BadRequestException {
  constructor(options: ClientExceptionOptions) {
    const { information, statusCode } = options;

    const finalStatusCode = statusCode ?? HttpStatus.BAD_REQUEST;
    super({
      status: finalStatusCode,
      message: information.message,
    });
  }
}
