/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const [req, res] = context.getArgs();
        if (req.user) {
          this.logger.debug(
            `${req.user?.id} ${req.clientIp} ${
              req.method
            }: ${req.url} => ${res.statusCode} @ ${new Date().toLocaleString()}`,
          );
        } else {
          this.logger.log(
            `Anonymouse user [unknow email address] ${req.clientIp} ${
              req.method
            }: ${req.url} => ${res.statusCode} @ ${new Date().toLocaleString()}`,
          );
        }

        return value;
      }),
    );
  }
}
