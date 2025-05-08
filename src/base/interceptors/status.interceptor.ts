import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

interface ResponseType<T> {
  data: T;
  status?: number;
}

@Injectable()
export class StatusInterceptor<T>
  implements NestInterceptor<T, T | ResponseType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<T | ResponseType<T>> {
    return next.handle().pipe(
      map((data: T | ResponseType<T>) => {
        const response: Response = context.switchToHttp().getResponse();
        if (this.isResponse(data)) {
          if (data.status) {
            response.status(data.status);
          }

          return data;
        }

        return data;
      }),
    );
  }

  private isResponse(data: any): data is ResponseType<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data && typeof data === 'object';
  }
}
