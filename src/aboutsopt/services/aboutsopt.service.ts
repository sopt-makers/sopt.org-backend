import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutSoptPostDto } from '../dtos/aboutsopt-post.dto';
import { AboutSopt } from '../entities/aboutsopt.entity';
import { CoreValue } from '../entities/coreValue.entity';

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

  async postAboutSopt(
    aboutSoptPostDto: AboutSoptPostDto,
  ): Promise<AboutSopt | null> {
    const aboutsopt = await this.aboutSoptRepository.save(aboutSoptPostDto);

    const id = aboutSoptPostDto.id;
    return await this.getOrInit(id);
  }
}
