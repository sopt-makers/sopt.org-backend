import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl}  ${statusCode} ${contentLength} ${JSON.stringify(
          body,
        )} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
