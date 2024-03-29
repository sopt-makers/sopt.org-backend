import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoreValue } from './coreValue.entity';

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
    name: 'title',
    nullable: false,
    length: '200',
    default: '',
    comment: '상단 배너 타이틀',
  })
  title: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CoreValue, (coreValue) => coreValue.aboutSopt, {
    eager: true,
    cascade: true,
  })
  coreValues: CoreValue[];

  static from(id: number): AboutSopt {
    const aboutSopt = new AboutSopt();
    aboutSopt.id = id;
    aboutSopt.coreValues = [
      CoreValue.init(),
      CoreValue.init(),
      CoreValue.init(),
    ];
    return aboutSopt;
  }
}
