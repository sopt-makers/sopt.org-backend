import { CrewService } from './../../internal/crew/crew.service';
import { CrewRepository } from './../../internal/crew/crew.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { StudyService } from './study.service';
import { InternalServerErrorException } from '@nestjs/common';
import { CrewMeetingResponseDto } from '../../internal/crew/dto/crew-study-response.dto';

describe('StudyServiceTest', () => {
  let studyService: StudyService;
  let crewService: CrewService;
  let crewRepository: CrewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewService,
        StudyService,
        {
          provide: CrewRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    crewService = module.get<CrewService>(CrewService);
    studyService = module.get<StudyService>(StudyService);
    crewRepository = module.get<CrewRepository>(CrewRepository);
  });

  it('should be defined', () => {
    expect(studyService).toBeDefined();
    expect(crewRepository).toBeDefined();
  });

  describe('GetStudyCount Method', () => {
    it('StudyRepository.findAll 메서드에서 Error가 발생하면 getStudyCount의 response는 null이다', async () => {
      const mockError = new InternalServerErrorException('mock error');
      crewRepository.findAll = jest.fn().mockRejectedValue(mockError);

      const response = await studyService.getStudyCount();

      expect(response).toBeNull();
    });

    it('StudyRepository에서 Error가 발생하지 않으면 getStudyCount의 response는 number이다', async () => {
      const mockResponse: CrewMeetingResponseDto = {
        statusCode: 200,
        data: {
          meetings: [],
          meta: {
            page: 1,
            take: 12,
            itemCount: 1,
            pageCount: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      };
      crewRepository.findAll = jest.fn().mockResolvedValue(mockResponse);

      const response = await studyService.getStudyCount();

      expect(typeof response).toBe('number');
    });
  });

  describe('GetStudies Method', () => {
    it('CrewRepository FindAll 메서드 에서 Error가 발생하면 getStudies는 Error를 Throw 한다.', async () => {
      const mockError = new InternalServerErrorException('mock error');
      crewRepository.findAll = jest.fn().mockRejectedValue(mockError);

      await expect(studyService.getStudies()).rejects.toThrowError(mockError);
    });

    it('StudyRepository FindAll 메서드 에서 Error가 발생하지 않으면, getStudies는 List를 반환한다.', () => {
      const mockResponse: CrewMeetingResponseDto = {
        statusCode: 200,
        data: {
          meetings: [],
          meta: {
            page: 1,
            take: 12,
            itemCount: 0,
            pageCount: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      };
      crewRepository.findAll = jest.fn().mockResolvedValue(mockResponse);

      const response = studyService.getStudies();

      expect(response).resolves.toEqual(mockResponse.data.meetings);
      expect(response).resolves.toHaveLength(0);
    });
  });
});
