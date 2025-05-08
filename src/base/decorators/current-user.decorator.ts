import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentUserData {
  sub: string;
  username: string | null;
}

export const CurrentUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ): ICurrentUserData | string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (data) {
      if (data == 'id' || data == 'userId') {
        data = 'sub';
      }
      return user?.[data];
    }

    return user;
  },
);
