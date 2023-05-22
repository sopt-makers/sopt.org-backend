import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { EnvConfig } from '../configs/env.config';
import { AuthGuard } from './auth.guard';
import { AuthPlaygroundGuard } from './auth-playground.guard';
import { PlaygroudModule } from '../internal/playground/playgroud.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig>) => {
        return {
          secret: configService.get('ACCESS_TOKEN_SECRET'),
        };
      },
    }),
    PlaygroudModule,
  ],
  providers: [AuthService, AuthGuard, AuthPlaygroundGuard],
  exports: [AuthService],
})
export class AuthModule {}
