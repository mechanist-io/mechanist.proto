import { ClassConstructor, plainToInstance } from 'class-transformer';
import { IsInt, IsNotEmpty, validateOrReject } from 'class-validator';

export interface ICanValidate {
  validate(): Promise<void>;
}

export abstract class BaseMQDto implements ICanValidate {
  async validate(): Promise<void> {
    const object = plainToInstance(
      this.constructor as ClassConstructor<this>,
      this,
    );
    await validateOrReject(object);
  }
}

export class IServiceMessageContract<T extends ICanValidate> {
  data: T;
  id?: string;
  status: number;
}
export class ServiceMessageContract<T extends ICanValidate>
  implements IServiceMessageContract<T>
{
  data: T;

  @IsNotEmpty()
  id: string;

  @IsInt()
  status: number;

  async validate(dataClass: ClassConstructor<T>): Promise<void> {
    const object = plainToInstance(ServiceMessageContract<T>, this);
    await validateOrReject(object);
    const dataObject = plainToInstance(dataClass, this.data);
    await dataObject.validate();
  }

  static from<T extends ICanValidate>(
    input: IServiceMessageContract<T>,
  ): ServiceMessageContract<T> {
    const message = plainToInstance(ServiceMessageContract<T>, input);
    return message;
  }
}
