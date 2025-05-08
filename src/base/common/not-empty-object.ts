import { ApiHideProperty } from '@nestjs/swagger';
import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class EmptyObjectGuardValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    object.emptyObjectGuard = undefined;
    if (
      Object.values(object).every(
        val => val === undefined || val === '' || val === null,
      )
    ) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return 'At least one field must be provided.';
  }
}

export class NotEmptyObject {
  @ApiHideProperty()
  @Validate(EmptyObjectGuardValidator)
  emptyObjectGuard?: any;
}
