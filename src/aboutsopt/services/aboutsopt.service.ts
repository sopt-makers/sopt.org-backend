import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AboutSoptPostDto } from '../dtos/aboutsopt-post.dto';
import { AboutSoptRequestDto } from '../dtos/aboutsopt-request.dto';
import { AboutSopt } from '../entities/aboutsopt.entity';

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private aboutSoptRepository: Repository<AboutSopt>,
  ) {}

  async getAboutSopt(
    aboutSoptRequestDto: AboutSoptRequestDto | number,
  ): Promise<AboutSopt | null> {
    let id = 0;
    if (typeof aboutSoptRequestDto === 'number') {
      id = aboutSoptRequestDto;
    } else {
      id = aboutSoptRequestDto.id;
    }
    const aboutsopt = await this.aboutSoptRepository.findOne({
      where: { id: id, isPublished: true },
    });
    return aboutsopt;
  }

  async getOrInit(
    aboutSoptRequestDto: AboutSoptRequestDto | number,
  ): Promise<AboutSopt | null> {
    let id = 0;
    if (typeof aboutSoptRequestDto === 'number') {
      id = aboutSoptRequestDto;
    } else {
      id = aboutSoptRequestDto.id;
    }
    const aboutsopt = await this.aboutSoptRepository.findOne({
      where: { id: id },
    });

    if (!aboutsopt) {
      return this.initializeAboutSoptById(id);
    }

    return aboutsopt;
  }

  private async initializeAboutSoptById(id: number): Promise<AboutSopt | null> {
    await this.aboutSoptRepository.save({ id });
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
