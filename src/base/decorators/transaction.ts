/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Request } from 'express';
import { TYPEORM_DATA_SOURCE } from '../constants';

// Assuming you have a constant for the DataSource token

/**
 * A decorator that wraps a method in a database transaction.
 * @returns A MethodDecorator that can be used to decorate class methods.
 */
export function Transaction(): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
      throw new Error('Transaction decorator can only be used on methods');
    }

    // Inject DataSource
    Inject(TYPEORM_DATA_SOURCE)(target, 'dataSource');

    descriptor.value = async function (
      this: any,
      ...args: any[]
    ): Promise<any> {
      const dataSource: DataSource = this.dataSource;

      return dataSource.transaction(
        async (transactionalEntityManager: EntityManager) => {
          return originalMethod.apply(this, [
            ...args,
            transactionalEntityManager,
          ]);
        },
      );
    };

    return descriptor;
  };
}

/**
 * Type guard to check if a value is an EntityManager.
 * @param value - The value to check.
 * @returns True if the value is an EntityManager, false otherwise.
 */
function isEntityManager(value: unknown): value is EntityManager {
  return value instanceof EntityManager;
}

// Extend the Express Request interface to include transactionManager
declare global {
  namespace Express {
    interface Request {
      transactionManager?: unknown;
    }
  }
}

/**
 * A parameter decorator that injects the current transaction's EntityManager.
 */
export const TransactionManager = createParamDecorator<
  unknown,
  ExecutionContext,
  EntityManager
>((_data: unknown, ctx: ExecutionContext): EntityManager => {
  const req: Request = ctx.switchToHttp().getRequest<Request>();
  const transactionManager = req.transactionManager as
    | EntityManager
    | undefined;

  if (!isEntityManager(transactionManager)) {
    throw new Error('TransactionManager is not available in this context');
  }

  return transactionManager;
});
