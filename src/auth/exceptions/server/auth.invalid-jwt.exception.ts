import { InternalServerErrorException } from '@nestjs/common';

export class AuthInvalidJWTException extends InternalServerErrorException {
  constructor() {
    super('Invalid JWT token');
  }
}
