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

    this.validateAboutSoptPostDto(aboutSopt, aboutSoptUpdateDto);

    aboutSopt.bannerImage = aboutSoptUpdateDto.bannerImage;
    aboutSopt.coreDescription = aboutSoptUpdateDto.coreDescription;
    aboutSopt.planCurriculum = aboutSoptUpdateDto.planCurriculum;
    aboutSopt.androidCurriculum = aboutSoptUpdateDto.androidCurriculum;
    aboutSopt.designCurriculum = aboutSoptUpdateDto.designCurriculum;
    aboutSopt.iosCurriculum = aboutSoptUpdateDto.iosCurriculum;
    aboutSopt.serverCurriculum = aboutSoptUpdateDto.serverCurriculum;
    aboutSopt.webCurriculum = aboutSoptUpdateDto.webCurriculum;

    aboutSopt.coreValues.map((coreValue) => {
      const coreValueDto = aboutSoptUpdateDto.coreValues.find(
        (coreValueDto) => coreValueDto.id === coreValue.id,
      ) as CoreValueUpdateDto;
      coreValue.title = coreValueDto.title;
      coreValue.subTitle = coreValueDto.subTitle;
      coreValue.imageUrl = coreValueDto.imageUrl;
      return coreValue;
    });
    await this.coreValueRepository.save(aboutSopt.coreValues);
    await this.aboutSoptRepository.save(aboutSopt);
    return aboutSopt;
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
