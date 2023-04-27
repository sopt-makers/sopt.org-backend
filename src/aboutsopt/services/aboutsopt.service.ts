import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutSopt } from '../entities/aboutsopt.entity';
import { CoreValue } from '../entities/coreValue.entity';
import {
  AboutSoptUpdateDto,
  CoreValueUpdateDto,
} from '../dtos/aboutsopt-update.dto';

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private readonly aboutSoptRepository: Repository<AboutSopt>,
    @InjectRepository(CoreValue)
    private readonly coreValueRepository: Repository<CoreValue>,
  ) {}

  async getAboutSopt(id: number): Promise<AboutSopt | null> {
    const aboutsopt = await this.aboutSoptRepository.findOne({
      where: { id: id, isPublished: true },
    });
    return aboutsopt;
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
    const aboutSopt = await this.aboutSoptRepository.save({ id });
    const saveCoreValues = [
      CoreValue.init(),
      CoreValue.init(),
      CoreValue.init(),
    ].map((coreValue) => {
      coreValue.aboutSopt = aboutSopt;
      return this.coreValueRepository.save(coreValue);
    });

    await Promise.all(saveCoreValues);

    return this.aboutSoptRepository.findOne({ where: { id: id } });
  }

  async updateAboutSopt(
    id: number,
    aboutSoptPostDto: AboutSoptUpdateDto,
  ): Promise<AboutSopt> {
    const aboutSopt = await this.aboutSoptRepository.findOne({
      where: { id: id },
      order: {
        coreValues: {
          id: 'asc',
        },
      },
    });
    if (!aboutSopt) {
      throw new NotFoundException('Not found about sopt with id: ' + id);
    }

    this.validateAboutSoptPostDto(aboutSopt, aboutSoptPostDto);

    aboutSopt.bannerImage = aboutSoptPostDto.bannerImage;
    aboutSopt.coreDescription = aboutSoptPostDto.coreDescription;
    aboutSopt.planCurriculum = aboutSoptPostDto.planCurriculum;
    aboutSopt.androidCurriculum = aboutSoptPostDto.androidCurriculum;
    aboutSopt.designCurriculum = aboutSoptPostDto.designCurriculum;
    aboutSopt.iosCurriculum = aboutSoptPostDto.iosCurriculum;
    aboutSopt.serverCurriculum = aboutSoptPostDto.serverCurriculum;
    aboutSopt.webCurriculum = aboutSoptPostDto.webCurriculum;

    aboutSopt.coreValues.map((coreValue) => {
      const coreValueDto = aboutSoptPostDto.coreValues.find(
        (coreValueDto) => coreValueDto.id === coreValue.id,
      ) as CoreValueUpdateDto;
      coreValue.title = coreValueDto.title;
      coreValue.subTitle = coreValueDto.subTitle;
      coreValue.imageUrl = coreValueDto.imageUrl;
      return this.coreValueRepository.save(coreValue);
    });
    return this.aboutSoptRepository.save(aboutSopt);
  }

  private validateAboutSoptPostDto(
    aboutSopt: AboutSopt,
    aboutSoptPostDto: AboutSoptUpdateDto,
  ): void {
    const coreValueIds = aboutSopt.coreValues.map((coreValue) => coreValue.id);
    aboutSoptPostDto.coreValues.forEach((coreValueDto) => {
      if (!coreValueIds.includes(coreValueDto.id)) {
        throw new NotFoundException(
          'Not found core value with id: ' + coreValueDto.id,
        );
      }
    });
  }
}
