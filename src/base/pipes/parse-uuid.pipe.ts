import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationRequestException } from '../exceptions/http/validation.exception';
import { isUUID } from 'class-validator';
//TODO: import { i18nValidationMessage } from "nestjs-i18n";

@Injectable()
export class ParseOptionalUUIDPipe
  implements PipeTransform<string | undefined>
{
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined) {
      return undefined;
    }
    if (isUUID(value)) {
      return value;
    }

    // TODO: user i18nValidationMessage
    throw new ValidationRequestException({
      information: {
        message: 'Invalid UUID', //TODO: read this from i18n
        identifier: `validation.invalidParameter.${metadata.data}`,
      },
    });
  }
}

@Injectable()
export class ParseRequiredUUIDPipe
  implements PipeTransform<string | undefined>
{
  transform(value: string, metadata: ArgumentMetadata) {
    if (isUUID(value)) {
      return value;
    }

    if (value === undefined) {
      throw new ValidationRequestException({
        information: {
          message:
            'Invalid UUID. The property is required, and must have a value.', //TODO: read this from i18n
          identifier: `validation.invalidParameter.${metadata.data}`,
        },
      });
    }

    throw new ValidationRequestException({
      information: {
        message: 'Invalid UUID', //TODO: read this from i18n
        identifier: `validation.invalidParameter.${metadata.data}`,
      },
    });
  }
}
