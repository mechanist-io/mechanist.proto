/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// Custom validator to handle case-insensitive enum validation
export function IsEnumCaseInsensitive(
  entity: object,
  validationOptions?: ValidationOptions,
) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'isEnumCaseInsensitive',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const enumValues = Object.values(entity);

          return (
            enumValues.includes(value) ||
            enumValues.includes(value.toUpperCase())
          ); // Convert input to uppercase and check
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid enum value ${Object.keys(entity).join(', ')}`;
        },
      },
    });
  };
}
