import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { StudyResponseDto } from '../dtos/study-response.dto';
import { EnvConfig } from 'src/configs/env.config';
import {
  CrewMeetingDto,
  CrewMeetingResponseDto,
} from '../dtos/crew-study-response.dto';
import { Cacheable } from '../../common/cache';

@Injectable()
export class StudyService {
  private URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.URL = this.configService.get('CREW_API_URL') as string;
  }

  @Cacheable({
    ttl: 30 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async findAll(): Promise<StudyResponseDto[]> {
    return await lastValueFrom(
      this.httpService
        .get<CrewMeetingResponseDto>(
          `${
            this.URL
          }/meeting?isOnlyActiveGeneration=${true}&page=${1}&take=${50}&category=${encodeURI(
            '스터디',
          )}`,
        )
        .pipe(
          map((res) => res.data.data.meetings),
          map((meetings: CrewMeetingDto[]) => {
            return meetings.map((meeting: CrewMeetingDto): StudyResponseDto => {
              return {
                id: meeting.id,
                generation: meeting.targetActiveGeneration,
                parts: meeting.joinableParts,
                title: meeting.title,
                imageUrl: meeting.imageURL.length
                  ? meeting.imageURL[0].url
                  : null,
                startDate: meeting.startDate,
                endDate: meeting.endDate,
                memberCount: meeting.appliedInfo.length,
              };
            });
          }),
          catchError((error) => {
            console.error(`Get Study Failed: ${error}`);
            return of([]);
          }),
        ),
    );
  }

  async findByGeneration(generation: number): Promise<StudyResponseDto[]> {
    const allStudies = await this.findAll();
    return allStudies.filter((study) => study.generation === generation);
  }

  /**
   * 공홈 AboutTab에서 StudyCount를 집계할때 사용됩니다.
   */
  async getStudyCount(): Promise<number> {
    const findStudyResponse = await this.findStudy({ page: 1, limit: 1 });
    return findStudyResponse.data.meta.itemCount;
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
            throw new InternalServerErrorException(
              'Get study API Error',
              error.message,
            );
          }),
        ),
    );
  }
}
