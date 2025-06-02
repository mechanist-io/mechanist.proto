import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

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
    const { user } = request;
    if (data) {
      let key = data;
      if (key === 'id' || key === 'userId') {
        key = 'sub';
      }
      return user?.[key];
    }

    return user;
  },
);
