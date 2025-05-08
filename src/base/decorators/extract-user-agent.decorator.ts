import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InvalidUserAgentException } from '../exceptions/http/user-agent.invalid.exception';

export const ExtractUserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent =
      request.headers['User-Agent'] || request.headers['user-agent'];
    if (!userAgent || userAgent == '') throw new InvalidUserAgentException();

    return userAgent;
  },
);
