import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { EnvConfig } from '../../configs/env.config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CrewMeetingResponseDto } from './dto/crew-study-response.dto';

@Injectable()
export class CrewRepository {
  private URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.URL = this.configService.get('CREW_API_URL') as string;
  }

  async findAll({
    page = 1,
    limit = 12,
  }: {
    page: number;
    limit: number;
  }): Promise<CrewMeetingResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<CrewMeetingResponseDto>(
          `${
            this.URL
          }/meeting?isOnlyActiveGeneration=${true}&page=${page}&take=${limit}&category=${encodeURI(
            '스터디',
          )}`,
        )
        .pipe(
          map((res) => res.data),
          catchError((error: AxiosError<unknown>) => {
            console.error(error.response);
            throw new InternalServerErrorException(
              'Get study API Error',
              error.message,
            );
          }),
        ),
    );
  }
}
