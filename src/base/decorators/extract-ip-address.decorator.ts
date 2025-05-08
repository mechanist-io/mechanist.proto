import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractIpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const ipAddress = request.ip;
    return ipAddress;
  },
);
