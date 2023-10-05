import { Injectable } from '@nestjs/common';
import { StudyResponseDto } from 'src/study/dtos/study-response.dto';
import { CrewRepository } from './crew.repository';
import { CrewMeetingDto } from './dto/crew-study-response.dto';

@Injectable()
export class CrewService {
  constructor(private readonly crewRepository: CrewRepository) {}

  async getStudies(): Promise<StudyResponseDto[]> {
    const MAX_TAKE_COUNT = 50;
    const PREVIOUS_GEN = 32; // TODO. 임시로 집어넣은 부분이라 추후 클라와 상의 후, 기수를 입력받는 형식으로 API를 수정해야함!
    const response = await this.crewRepository.findAll(
      {
        page: 1,
        limit: MAX_TAKE_COUNT,
      },
      PREVIOUS_GEN,
    );

    return response.data.meetings.map(
      (meeting: CrewMeetingDto): StudyResponseDto => {
        return {
          id: meeting.id,
          generation: meeting.createdGeneration,
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

  async getStudyCount(generation?: number): Promise<number | null> {
    try {
      const findStudyResponse = await this.crewRepository.findAll(
        {
          page: 1,
          limit: 1,
        },
        generation,
      );
      return findStudyResponse.data.meta.itemCount;
    } catch (error) {
      return null;
    }
  }
}
