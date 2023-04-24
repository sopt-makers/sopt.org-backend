import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Index('aboutsopt_pk', ['id'], { unique: true })
@Entity('AboutSopt', { schema: 'public' })
export class AboutSopt {
  @PrimaryColumn({ type: 'integer', name: 'id', comment: '기수' })
  id: number;

  @Column('boolean', {name: 'isPublished', nullable: false, default: false, comment: '배포 여부'})
  isPublished: boolean;

  @Column('varchar', { name: 'bannerImage', nullable: true, length: 400, comment: '배너 이미지' })
  bannerImage: string;
  
  @Column('varchar', { name: 'coreDescription', nullable: true, length:400, comment: '핵심가치 설명'})
  coreDescription: string;
  
  @Column('varchar', { name: 'coreValue1', nullable: true, length:400, comment: '핵심가치 1'})
  coreValue1: string;

  @Column('varchar', { name: 'coreValue2', nullable: true, length:400, comment: '핵심가치 2'})
  coreValue2: string;

  @Column('varchar', { name: 'coreValue3', nullable: true, length:400, comment: '핵심가치 3'})
  coreValue3: string;

  @Column('varchar', { name: 'planCurriculum', nullable: true, length: 400, comment: '기획 파트 커리큘럼' })
  planCurriculum: string;

  @Column('varchar', { name: 'designCurriculum', nullable: true, length: 400, comment: '디자인 파트 커리큘럼' })
  designCurriculum: string;

  @Column('varchar', { name: 'androidCurriculum', nullable: true, length: 400, comment: '안드로이드 파트 커리큘럼' })
  androidCurriculum: string;

  @Column('varchar', { name: 'iosCurriculum', nullable: true, length: 400, comment: 'ios 파트 커리큘럼' })
  iosCurriculum: string;

  @Column('varchar', { name: 'webCurriculum', nullable: true, length: 400, comment: '웹 파트 커리큘럼' })
  webCurriculum: string;

  @Column('varchar', { name: 'serverCurriculum', nullable: true, length: 400, comment: '서버 파트 커리큘럼' })
  serverCurriculum: string;

  @OneToMany(() => Activity, (activity) => activity.aboutSopt, {eager: true})
  activities: Activity[];

}
