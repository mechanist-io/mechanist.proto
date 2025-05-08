import { ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { ValidationRequestException } from '../exceptions/http/validation.exception';

function mapValidationError(
  error: ValidationError,
  level: number = 0,
): { message: string; identifier: string }[] {
  if (level > 2) {
    // Ignore deeper levels
    return [];
  }

  if (error.constraints) {
    return [
      {
        message: `${error.value} is not a valid value for the property \'${error.property}\', ${Object.values(error.constraints)[0]}`,
        identifier: `validation.invalidParameter.${error.property}`,
      },
    ];
  }

  if (error.children) {
    return error.children.flatMap(child =>
      mapValidationError(child, level + 1),
    );
  }

  return [
    {
      message: 'property is invalid',
      identifier: `validation.invalidParameter.${error.property}`,
    },
  ];
}
const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  enableDebugMessages: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const mappedErrors = errors.flatMap(error => mapValidationError(error));
    if (mappedErrors.length > 0) {
      return new ValidationRequestException({
        information: {
          message: mappedErrors[0].message,
          identifier: mappedErrors[0].identifier,
        },
      });
    }
    return new ValidationRequestException({
      information: {
        message: 'Validation failed, please check the request parameters.',
        identifier: 'validation.validationFailed',
      },
    });
  },
};

export default validationOptions;
