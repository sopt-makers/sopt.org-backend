import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { EnvConfig } from '../../configs/env.config';
import { GetPlaygroundUserInfoResponseDto } from './dto/get-playground-user-info-response.dto';
import { PlaygroundProjectResponseDto } from './dto/playground-project-response.dto';
import { PlaygroundProjectDetailResponseDto } from './dto/playground-project-detail-response.dto';

@Injectable()
export class PlaygroundRepository {
  private readonly API_URL: string;
  private readonly jwtToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.API_URL = this.configService.get('PLAYGROUND_API_URL') as string;
    this.jwtToken = this.configService.get(
      'PLAYGROUND_API_URL_JWT_TOKEN',
    ) as string;
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

  async getAllProjects(): Promise<PlaygroundProjectResponseDto[]> {
    return await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectResponseDto[]>(
          `${this.API_URL}/internal/api/v1/projects`,
          {
            headers: {
              Authorization: this.jwtToken,
            },
          },
        )
        .pipe(map((res) => res.data)),
    );
  }

  async getProjectDetail(
    projectId: number,
  ): Promise<PlaygroundProjectDetailResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectDetailResponseDto>(
          `${this.API_URL}/internal/api/v1/projects/${projectId}`,
          {
            headers: {
              Authorization: this.jwtToken,
            },
          },
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((error) => {
            throw new HttpException(
              'API ' + error.response.data.error,
              error.response.data.status,
            );
          }),
        ),
    );
  }
}
