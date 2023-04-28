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

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private readonly aboutSoptRepository: Repository<AboutSopt>,
    @InjectRepository(CoreValue)
    private readonly coreValueRepository: Repository<CoreValue>,
  ) {}

  async getAboutSopt(id: number): Promise<AboutSopt> {
    const aboutsopt = await this.aboutSoptRepository.findOne({
      where: { id: id, isPublished: true },
    });

    if (!aboutsopt) {
      throw new NotFoundException(
        'Not found Published about sopt with id: ' + id,
      );
    }
    return aboutsopt;
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
        'there is not filled field in : ' + aboutSopt.id,
      );
    }
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
}
