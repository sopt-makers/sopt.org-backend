import { StudyResponseDto } from './../dtos/study-response.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/configs/env.config';
import { catchError, lastValueFrom, map, of } from 'rxjs';

@Injectable()
export class StudyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async findAll(isOnlyActiveGeneration: boolean): Promise<StudyResponseDto[]> {
    const meetingApiPath = '/meeting';

    const apiUrl = this.configService.get('CREW_API_URL');

    const response = await lastValueFrom(
      this.httpService
        .get<StudyResponseDto[]>(apiUrl + meetingApiPath, {
          params: {
            isOnlyActiveGeneration,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            console.error(`Get Study Failed: ${error}`);
            return of([]);
          }),
        ),
    );

    return response;
  }
}
