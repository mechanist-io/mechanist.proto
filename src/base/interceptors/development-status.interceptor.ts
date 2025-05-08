/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { SetMetadata, UseInterceptors } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const DEVELOPMENT_STATUS_KEY = 'developmentStatus';

export enum DevelopmentStatusEnum {
  STABLE = 'stable',
  BETA = 'beta',
  ALPHA = 'alpha',
  DEPRECATED = 'deprecated',
}

@Injectable()
export class DevelopmentStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const status =
      Reflect.getMetadata(DEVELOPMENT_STATUS_KEY, context.getHandler()) ||
      Reflect.getMetadata(DEVELOPMENT_STATUS_KEY, context.getClass());

    return next.handle().pipe(
      map(data => {
        if (status && status !== DevelopmentStatusEnum.STABLE) {
          return {
            ...data,
            meta: {
              developmentStatus: status,
              message: `This endpoint is currently in ${status} status. Use with caution.`,
            },
          };
        }

        return data;
      }),
    );
  }
}

export function DevelopmentStatus(status: DevelopmentStatusEnum) {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    if (descriptor) {
      SetMetadata(DEVELOPMENT_STATUS_KEY, status)(
        target,
        key as string,
        descriptor,
      );
      UseInterceptors(DevelopmentStatusInterceptor)(
        target,
        key as string,
        descriptor,
      );
    } else {
      SetMetadata(DEVELOPMENT_STATUS_KEY, status)(target);
      UseInterceptors(DevelopmentStatusInterceptor)(target);
    }
  };
}
