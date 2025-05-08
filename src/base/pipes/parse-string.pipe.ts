import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationRequestException } from '../exceptions/http/validation.exception';
//TODO: import { i18nValidationMessage } from "nestjs-i18n";

@Injectable()
export class ParseRequiredStringPipe
  implements PipeTransform<string | undefined>
{
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined) {
      throw new ValidationRequestException({
        information: {
          message:
            'Invalid String. The property is required, and must have a value.', //TODO: read this from i18n
          identifier: `validation.invalidParameter.${metadata.data}`,
        },
      });
    }

    if (value.length < 1) {
      throw new ValidationRequestException({
        information: {
          message: 'Invalid String', //TODO: read this from i18n
          identifier: `validation.invalidParameter.${metadata.data}`,
        },
      });
    }

    return value;
  }
}
