import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { CoreValue } from './coreValue.entity';
import {
  AboutSoptUpdateDto,
  CoreValueUpdateDto,
} from '../dtos/aboutsopt-update.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Index('aboutsopt_pk', ['id'], { unique: true })
@Entity('AboutSopt', { schema: 'public' })
export class AboutSopt {
  @PrimaryColumn({ type: 'integer', name: 'id', comment: '기수' })
  id: number;

  @Column('boolean', {
    name: 'isPublished',
    nullable: false,
    default: false,
    comment: '배포 여부',
  })
  isPublished: boolean;

  @Column('varchar', {
    name: 'bannerImage',
    default: '',
    length: 400,
    comment: '배너 이미지',
  })
  bannerImage: string;

  @Column('varchar', {
    name: 'coreDescription',
    default: '',
    length: 400,
    comment: '핵심가치 설명 (ex 브랜딩 메시지)',
  })
  coreDescription: string;

  @Column('varchar', {
    name: 'planCurriculum',
    default: '',
    length: 400,
    comment: '기획 파트 커리큘럼',
  })
  planCurriculum: string;

  @Column('varchar', {
    name: 'designCurriculum',
    default: '',
    length: 400,
    comment: '디자인 파트 커리큘럼',
  })
  designCurriculum: string;

  @Column('varchar', {
    name: 'androidCurriculum',
    default: '',
    length: 400,
    comment: '안드로이드 파트 커리큘럼',
  })
  androidCurriculum: string;

  @Column('varchar', {
    name: 'iosCurriculum',
    default: '',
    length: 400,
    comment: 'ios 파트 커리큘럼',
  })
  iosCurriculum: string;

  @Column('varchar', {
    name: 'webCurriculum',
    default: '',
    length: 400,
    comment: '웹 파트 커리큘럼',
  })
  webCurriculum: string;

  @Column('varchar', {
    name: 'serverCurriculum',
    default: '',
    length: 400,
    comment: '서버 파트 커리큘럼',
  })
  serverCurriculum: string;

  @OneToMany(() => CoreValue, (coreValue) => coreValue.aboutSopt, {
    eager: true,
  })
  coreValues: CoreValue[];

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

  overwrite(aboutSoptUpdateDto: AboutSoptUpdateDto): void {
    this.overwriteValidate(this, aboutSoptUpdateDto);

    this.bannerImage = aboutSoptUpdateDto.bannerImage;
    this.coreDescription = aboutSoptUpdateDto.coreDescription;
    this.planCurriculum = aboutSoptUpdateDto.planCurriculum;
    this.androidCurriculum = aboutSoptUpdateDto.androidCurriculum;
    this.designCurriculum = aboutSoptUpdateDto.designCurriculum;
    this.iosCurriculum = aboutSoptUpdateDto.iosCurriculum;
    this.serverCurriculum = aboutSoptUpdateDto.serverCurriculum;
    this.webCurriculum = aboutSoptUpdateDto.webCurriculum;
    this.coreValues.map((coreValue) => {
      const coreValueDto = aboutSoptUpdateDto.coreValues.find(
        (coreValueDto) => coreValueDto.id === coreValue.id,
      ) as CoreValueUpdateDto;
      coreValue.title = coreValueDto.title;
      coreValue.subTitle = coreValueDto.subTitle;
      coreValue.imageUrl = coreValueDto.imageUrl;
      return coreValue;
    });
  }
}
