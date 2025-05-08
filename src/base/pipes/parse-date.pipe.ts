import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationRequestException } from '../exceptions/http/validation.exception';

@Injectable()
export class ParseOptionalDatePipe
  implements PipeTransform<string | undefined, Date | undefined>
{
  transform(value: string, metadata: ArgumentMetadata) {
    const date = Date.parse(value);
    if (!isNaN(date)) {
      return new Date(value);
    }

    if (value === undefined || isNaN(date)) {
      return undefined;
    }

    throw new ValidationRequestException({
      information: {
        message: 'Invalid Date. The property must have a valid date value.',
        identifier: `validation.invalidParameter.${metadata.data}`,
      },
    });
  }
}
@Injectable()
export class ParseRequiredDatePipe
  implements PipeTransform<string | undefined, Date>
{
  transform(value: string, metadata: ArgumentMetadata) {
    const date = Date.parse(value);

    if (!isNaN(date)) {
      return new Date(value);
    }

    if (value === undefined || isNaN(date)) {
      throw new ValidationRequestException({
        information: {
          message:
            'Invalid Date. The property is required, and must have a valid date value.', //TODO: read this from i18n
          identifier: `validation.invalidParameter.${metadata.data}`,
        },
      });
    }

    throw new ValidationRequestException({
      information: {
        message:
          'Invalid Date. The property is required, and must have a valid date value.', //TODO: read this from i18n
        identifier: `validation.invalidParameter.${metadata.data}`,
      },
    });
  }
}
