import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutSopt } from '../entities/aboutsopt.entity';
import { CoreValue } from '../entities/coreValue.entity';
import { AboutSoptUpdateDto } from '../dtos/aboutsopt-update.dto';

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

    aboutSopt.overwrite(aboutSoptUpdateDto);
    await this.coreValueRepository.save(aboutSopt.coreValues);
    await this.aboutSoptRepository.save(aboutSopt);
    return aboutSopt;
  }
}
