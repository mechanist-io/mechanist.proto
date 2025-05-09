import { InternalServerErrorException } from '@nestjs/common';

export class ConfigMissingKeyServerException extends InternalServerErrorException {
  constructor(dto: { reason: string }) {
    super(dto.reason);
  }
}
