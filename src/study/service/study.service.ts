import { CrewService } from './../../internal/crew/crew.service';
import { Injectable } from '@nestjs/common';
import { StudyResponseDto } from '../dtos/study-response.dto';
import { Cacheable } from '../../common/cache';

@Injectable()
export class StudyService {
  constructor(private readonly crewService: CrewService) {}

  @Cacheable({
    ttl: 24 * 60 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async getStudies(): Promise<StudyResponseDto[]> {
    return await this.crewService.getStudies();
  }

  /**
   * 공홈 AboutTab에서 StudyCount를 집계할때 사용됩니다.
   */
  async getStudyCount(generation?: number): Promise<number | null> {
    return await this.crewService.getStudyCount(generation);
  }
}
