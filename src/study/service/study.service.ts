import { Injectable } from '@nestjs/common';

import { StudyResponseDto } from '../dtos/study-response.dto';
import { CrewMeetingDto } from '../dtos/crew-study-response.dto';
import { StudyRepository } from '../repository/study.repository';
import { Cacheable } from '../../common/cache';

@Injectable()
export class StudyService {
  constructor(private readonly studyRepository: StudyRepository) {}

  @Cacheable({
    ttl: 60 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async getStudies(): Promise<StudyResponseDto[]> {
    const MAX_TAKE_COUNT = 50;
    const response = await this.studyRepository.findAll({
      page: 1,
      limit: MAX_TAKE_COUNT,
    });

    return response.data.meetings.map(
      (meeting: CrewMeetingDto): StudyResponseDto => {
        return {
          id: meeting.id,
          generation: meeting.targetActiveGeneration,
          parts: meeting.joinableParts,
          title: meeting.title,
          imageUrl: meeting.imageURL.length ? meeting.imageURL[0].url : null,
          startDate: meeting.startDate,
          endDate: meeting.endDate,
          memberCount: meeting.appliedInfo.length,
        };
      },
    );
  }

  /**
   * 공홈 AboutTab에서 StudyCount를 집계할때 사용됩니다.
   */
  async getStudyCount(): Promise<number> {
    const findStudyResponse = await this.studyRepository.findAll({
      page: 1,
      limit: 1,
    });
    return findStudyResponse.data.meta.itemCount;
  }
}
