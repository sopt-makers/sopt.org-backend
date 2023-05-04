import { StudyResponseDto } from '../dtos/study-response.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/configs/env.config';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import {
  CrewMeetingDto,
  CrewMeetingResponseDto,
} from '../dtos/crew-study-response.dto';

@Injectable()
export class StudyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async findAll(): Promise<StudyResponseDto[]> {
    const apiUrl = this.configService.get('CREW_API_URL');

    return await lastValueFrom(
      this.httpService
        .get<CrewMeetingResponseDto>(
          `${apiUrl}/meeting?isOnlyActiveGeneration=${true}`,
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

  async findBySemester(semester: number): Promise<StudyResponseDto[]> {
    const allStudies = await this.findAll();
    return allStudies.filter((study) => study.generation === semester);
  }
}
