import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from '../dtos/config.dto';
import { ConfigMissingKeyServerException } from '../exceptions/server/config.missing-key.server.exception';

export function validateConfiguration(
  processEnv: NodeJS.Dict<string>,
): ConfigDto {
  const validatedAndCastedEnv = plainToClass(ConfigDto, processEnv, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedAndCastedEnv, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new ConfigMissingKeyServerException({
      reason: errors.toString(),
    });
  }
  process.env = validatedAndCastedEnv;

  return validatedAndCastedEnv;
}
