import { Injectable } from '@nestjs/common';
import { StudyResponseDto } from 'src/study/dtos/study-response.dto';
import { CrewRepository } from './crew.repository';
import { CrewMeetingDto } from './dto/crew-study-response.dto';

@Injectable()
export class CrewService {
  constructor(private readonly crewRepository: CrewRepository) {}

  async getStudies(): Promise<StudyResponseDto[]> {
    const MAX_TAKE_COUNT = 50;
    const response = await this.crewRepository.findAll({
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

  async getStudyCount(): Promise<number | null> {
    try {
      const findStudyResponse = await this.crewRepository.findAll({
        page: 1,
        limit: 1,
      });
      return findStudyResponse.data.meta.itemCount;
    } catch (error) {
      return null;
    }
  }
}
