import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutSopt } from '../entities/aboutsopt.entity';
import { CoreValue } from '../entities/coreValue.entity';
import { AboutSoptUpdateDto } from '../dtos/aboutsopt-update.dto';
import { StudyService } from '../../study/service/study.service';
import { MemberService } from '../../members/service/member.service';
import { ProjectService } from '../../projects/services/project.service';
import { GetAboutSoptResponseDto } from '../dtos/get-about-sopt-response.dto';

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private readonly aboutSoptRepository: Repository<AboutSopt>,
    @InjectRepository(CoreValue)
    private readonly coreValueRepository: Repository<CoreValue>,
    private readonly memberService: MemberService,
    private readonly projectService: ProjectService,
    private readonly studyService: StudyService,
  ) {}

  async getAboutSopt(id?: number): Promise<GetAboutSoptResponseDto> {
    const queryBuilder = await this.aboutSoptRepository
      .createQueryBuilder('aboutSopt')
      .where('aboutSopt.isPublished = :isPublished', { isPublished: true });

    if (id) {
      queryBuilder.andWhere('aboutSopt.id = :id', { id: id });
    }

    queryBuilder
      .orderBy('aboutSopt.id', 'DESC')
      .leftJoinAndSelect('aboutSopt.coreValues', 'coreValues')
      .addOrderBy('coreValues.id', 'ASC');

    const aboutSopt = await queryBuilder.getOne();

    if (!aboutSopt) {
      throw new NotFoundException(
        'Not found Published about sopt with id: ' + id,
      );
    }

    // TODO. 현재 34기 데이터가 모이지 않은 관계로 추후 돌려놓아야 함
    // const generation = id ? id : aboutSopt.id;
    const generation = 33;

    const members = await this.memberService.findAll({ generation });
    const projects = await this.projectService.findByGeneration(generation);
    const studyCount = await this.studyService.getStudyCount(generation);

    return {
      aboutSopt: aboutSopt,
      activitiesRecords: {
        activitiesMemberCount: members.numberOfMembersAtGeneration,
        projectCounts: projects.length,
        studyCounts: studyCount,
      },
    };
  }

  async publishAboutSopt(id: number): Promise<AboutSopt | null> {
    const aboutsopt = await this.aboutSoptRepository.findOne({
      where: { id: id },
    });
    if (!aboutsopt) {
      throw new NotFoundException(
        'Not found Published about sopt with id: ' + id,
      );
    }
    this.validatePublishAboutSopt(aboutsopt);
    if (!aboutsopt.isPublished) {
      await this.aboutSoptRepository.update(aboutsopt.id, {
        isPublished: true,
      });
    } else {
      await this.aboutSoptRepository.update(aboutsopt.id, {
        isPublished: false,
      });
    }
    return this.aboutSoptRepository.findOne({
      where: { id: id },
    });
  }

  private validatePublishAboutSopt(aboutSopt: AboutSopt) {
    if (Object.values(aboutSopt).includes('')) {
      throw new BadRequestException(
        'there is not filled field in aboutSopt : ' + aboutSopt.id,
      );
    }
    aboutSopt.coreValues.forEach((coreValue) => {
      if (Object.values(coreValue).includes('')) {
        throw new BadRequestException(
          'there is not filled field in Core value : ' + aboutSopt.id,
        );
      }
    });
  }

  async getOrInit(id: number): Promise<AboutSopt | null> {
    const aboutSopt = await this.aboutSoptRepository.findOne({
      where: { id: id },
    });

    if (!aboutSopt) {
      return this.initializeAboutSoptById(id);
    }

    return aboutSopt;
  }

  private async initializeAboutSoptById(id: number): Promise<AboutSopt | null> {
    return this.aboutSoptRepository.save(AboutSopt.from(id));
  }

  async updateAboutSopt(
    id: number,
    aboutSoptUpdateDto: AboutSoptUpdateDto,
  ): Promise<AboutSopt> {
    const aboutSopt = await this.aboutSoptRepository.findOne({
      where: { id },
      order: {
        coreValues: {
          id: 'asc',
        },
      },
    });
    if (!aboutSopt) {
      throw new NotFoundException('Not found about sopt with id: ' + id);
    }

    this.overwriteValidate(aboutSopt, aboutSoptUpdateDto);

    return this.aboutSoptRepository.save({
      ...aboutSopt,
      ...aboutSoptUpdateDto,
    });
  }

  private overwriteValidate(
    aboutSopt: AboutSopt,
    aboutSoptUpdateDto: AboutSoptUpdateDto,
  ): void {
    const coreValueIds = aboutSopt.coreValues.map((coreValue) => coreValue.id);
    aboutSoptUpdateDto.coreValues.forEach((coreValueDto) => {
      if (!coreValueIds.includes(coreValueDto.id)) {
        throw new NotFoundException(
          'Not found core value with id: ' + coreValueDto.id,
        );
      }
    });

    const coreValueDtoIds = aboutSoptUpdateDto.coreValues.map(
      (coreValueDto) => coreValueDto.id,
    );
    const coreValueDtoIdsSet = new Set(coreValueDtoIds);

    if (coreValueIds.length !== coreValueDtoIdsSet.size) {
      throw new BadRequestException('Duplicated core value id');
    }
  }

  async getPublishedAboutSoptIds(): Promise<number[]> {
    const publishedAboutSoptIds = await this.aboutSoptRepository.find({
      select: ['id'],
      where: { isPublished: true },
      order: { id: 'desc' },
      loadEagerRelations: false,
    });

    return publishedAboutSoptIds.map((aboutSopt) => aboutSopt.id);
  }
}
