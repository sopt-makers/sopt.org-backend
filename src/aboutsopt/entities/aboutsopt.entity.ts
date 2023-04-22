import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from './activity.entity';
import { CoreValue } from './corevalue.entity';

@Index('aboutsopt_pk', ['id'], { unique: true })
@Entity('AboutSopt', { schema: 'public' })
export class AboutSopt {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id', comment: '기수' })
  id: number;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 400, comment: '배너 이미지' })
  thumbnail: string;
  
  @Column('varchar', { name: 'core_description', nullable: true, length:400, comment: '핵심가치 설명'})
  core_description: string;

  @OneToMany(() => CoreValue, (corevalue) => corevalue.aboutsopt)
  corevalues: CoreValue[];

  @Column('varchar', { name: 'plan', nullable: true, length: 400, comment: '기획 파트 커리큘럼' })
  plan_curriculum: string;

  @Column('varchar', { name: 'design', nullable: true, length: 400, comment: '디자인 파트 커리큘럼' })
  design_curriculum: string;

  @Column('varchar', { name: 'android', nullable: true, length: 400, comment: '안드로이드 파트 커리큘럼' })
  android_curriculum: string;

  @Column('varchar', { name: 'ios', nullable: true, length: 400, comment: 'ios 파트 커리큘럼' })
  ios_curriculum: string;

  @Column('varchar', { name: 'web', nullable: true, length: 400, comment: '웹 파트 커리큘럼' })
  web_curriculum: string;

  @Column('varchar', { name: 'server', nullable: true, length: 400, comment: '서버 파트 커리큘럼' })
  server_curriculum: string;

  @OneToMany(() => Activity, (activity) => activity.aboutsopt)
  activities: Activity[];

}
