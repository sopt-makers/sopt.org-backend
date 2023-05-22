import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PlaygroundUser } from '../type';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): PlaygroundUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
