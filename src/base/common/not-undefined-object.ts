import { ApiHideProperty } from '@nestjs/swagger';
import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class UndefinedObjectGuardValidator implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const object = args.object as any;
    delete object.undefinedObjectGuard;
    if (Object.keys(object).length === 0) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return 'At least one field must be provided.';
  }
}

export class NotUndefinedObject {
  @ApiHideProperty()
  @Validate(UndefinedObjectGuardValidator)
  undefinedObjectGuard?: any;
}
