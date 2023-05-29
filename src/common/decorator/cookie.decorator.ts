import {
  PipeTransform,
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export class NotNullPipe implements PipeTransform {
  transform(value: any) {
    if (value === null || value === undefined) {
      throw new BadRequestException(
        'Cookie(session) cannot be null or undefined',
      );
    }
    return value;
  }
}

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
