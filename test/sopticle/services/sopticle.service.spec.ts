import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ScraperService } from '../../../src/scraper/scraper.service';
import { SopticleLike } from '../../../src/sopticle/entities/sopticleLike.entity';
import { Sopticle } from '../../../src/sopticle/entities/sopticle.entity';
import { Repository } from 'typeorm';
import { SopticleService } from '../../../src/sopticle/services/sopticle.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Part } from '../../../src/common/type';
import { SopticleAuthor } from '../../../src/sopticle/entities/sopticle-author.entity';

describe('SopticleServiceTest', () => {
  let sopticleService: SopticleService;
  let scrapService: ScraperService;
  let sopticleLikeRepository: Repository<SopticleLike>;
  let sopticleRepository: Repository<Sopticle>;
  let sopticleAuthorRepository: Repository<SopticleAuthor>;
  let session: string;
  let id: number;

  let mockSopticleLike: SopticleLike;
  let mockSopticle: Sopticle;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SopticleService,
        {
          provide: getRepositoryToken(Sopticle),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SopticleLike),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SopticleAuthor),
          useClass: Repository,
        },

        {
          provide: ScraperService,
          useValue: {
            scrap: jest.fn(),
          },
        },
      ],
    }).compile();

    sopticleService = module.get<SopticleService>(SopticleService);
    scrapService = module.get<ScraperService>(ScraperService);
    sopticleLikeRepository = module.get<Repository<SopticleLike>>(
      getRepositoryToken(SopticleLike),
    );
    sopticleRepository = module.get<Repository<Sopticle>>(
      getRepositoryToken(Sopticle),
    );
    sopticleAuthorRepository = module.get<Repository<SopticleAuthor>>(
      getRepositoryToken(SopticleAuthor),
    );

    session = 'mockSession';
    id = 1;

    mockSopticleLike = new SopticleLike();

    mockSopticleLike.id = 1;
    mockSopticleLike.sessionId = session;
    mockSopticleLike.createdAt = new Date();

    mockSopticle = new Sopticle();
    mockSopticle.id = id;
    mockSopticle.sopticleLikes = [mockSopticleLike];
    mockSopticle.part = Part.DESIGN;
    mockSopticle.generation = 32;
    mockSopticle.thumbnailUrl = faker.internet.url();
    mockSopticle.title = faker.string.nanoid();
    mockSopticle.description = faker.lorem.text();
    mockSopticle.authorId = 2;
    mockSopticle.authorName = faker.person.fullName();
    mockSopticle.authorProfileImageUrl = faker.internet.url();
    mockSopticle.sopticleUrl = faker.internet.url();
    mockSopticle.likeCount = 1;
  });

  it('should be defined', () => {
    expect(sopticleService).toBeDefined();
    expect(scrapService).toBeDefined();
    expect(sopticleLikeRepository).toBeDefined();
    expect(sopticleRepository).toBeDefined();
    expect(sopticleAuthorRepository).toBeDefined();
  });

  describe('Sopticle Like', () => {
    it('솝티클이 존재하지 않으면 Not Found Exception을 던진다.', async () => {
      //given
      const sopticleRepositoryStub = jest
        .spyOn(sopticleRepository, 'findOne')
        .mockResolvedValue(null);
      //when

      await expect(sopticleService.like({ id, session })).rejects.toThrow(
        NotFoundException,
      );
      //then
      expect(sopticleRepositoryStub).toBeCalledWith({ where: { id } });
      expect(sopticleRepositoryStub).toHaveBeenCalled();
    });
    it('이미 좋아요를 눌렀으면 Not Found Exception을 던진다.', async () => {
      //given

      const sopticleRepositoryStub = jest
        .spyOn(sopticleRepository, 'findOne')
        .mockResolvedValue(mockSopticle);

      const isLikedStub = jest
        .spyOn(sopticleService, 'isLiked')
        .mockResolvedValue(true);

      //when
      //then
      await expect(sopticleService.like({ id, session })).rejects.toThrow(
        BadRequestException,
      );

      expect(sopticleRepositoryStub).toBeCalledWith({ where: { id } });
      expect(sopticleRepositoryStub).toHaveBeenCalled();

      expect(isLikedStub).toHaveBeenCalled();
      expect(isLikedStub).toBeCalledWith(id, session);
    });
    it.todo('좋아요를 누르면 솝티클 좋아요 테이블에 데이터를 추가한다.');
  });
});
