import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';

import { EnvConfig } from '../../configs/env.config';
import { CrewMeetingResponseDto } from '../dtos/crew-study-response.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class StudyRepository {
  private URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.URL = this.configService.get('CREW_API_URL') as string;
  }

  async findStudy({
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
          catchError((error) => {
            console.error(error);
            throw new InternalServerErrorException(
              'Get study API Error',
              error.message,
            );
          }),
        ),
    );
  }
}
