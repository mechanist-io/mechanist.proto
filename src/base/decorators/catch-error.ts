/* eslint-disable */
import { Logger } from '@nestjs/common';
import { AsyncMethodDecorator } from './async-method-decorator';

const logger = new Logger('Central Error Catch');

export function CatchError(bubble = true): AsyncMethodDecorator {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    // get original method
    const originalMethod = propertyDescriptor.value;

    // redefine descriptor value within own function block
    propertyDescriptor.value = async function (...args: any[]): Promise<any> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const targetName =
          typeof target === 'function' ? target.name : target.constructor.name;

        error = error instanceof Error ? error : new Error(error);

        logger.error(`${targetName} : ${propertyKey} - ${error.message}`);

        // rethrow error, so it can bubble up
        if (bubble) {
          throw error;
        }
      }
    };
  };
}
