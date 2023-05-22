import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';

import { EnvConfig } from '../../configs/env.config';
import { GetPlaygroundUserInfoResponseDto } from './dto/get-playground-user-info-response.dto';

@Injectable()
export class PlaygroundRepository {
  private readonly API_URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.API_URL = this.configService.get('PLAYGROUND_API_URL') as string;
  }

  async getUser(authToken: string): Promise<GetPlaygroundUserInfoResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<GetPlaygroundUserInfoResponseDto>(
          `${this.API_URL}/internal/api/v1/members/me`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        )
        .pipe(map((response) => response.data))
        .pipe(
          catchError((err) => {
            throw new InternalServerErrorException('API 서버 오류', err);
          }),
        ),
    );
  }
}
