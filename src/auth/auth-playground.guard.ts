import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaygroundService } from '../internal/playground/playground.service';

@Injectable()
export class AuthPlaygroundGuard implements CanActivate {
  constructor(private readonly playgroundService: PlaygroundService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
      return false;
    }

    const token = bearerToken.split('Bearer ')[1];

    const user = await this.playgroundService.getPlaygroundUserInfoByToken(
      token,
    );
    request.user = user;
    return true;
  }
}
