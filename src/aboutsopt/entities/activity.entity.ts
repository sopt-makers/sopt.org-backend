import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AboutSopt } from './aboutsopt.entity';

export enum Category {
    SEMINAR = 'SEMINAR',
    STUDY = 'STUDY',
    SOPKERTON = 'SOPKERTON',
    SOPTERM = 'SOPTERM',
    APPJAM = 'APPJAM',
    MEDIA_OPERATION = 'MEDIA_OPERATION',
}


@Index('activity_pk', ['id'], { unique: true })
@Entity('Activity', { schema: 'public' })
export class Activity {
  @PrimaryGeneratedColumn('increment',{ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'semester', nullable: true, comment: '기수' })
  semester: number;

  @Column('varchar', { name: 'category', nullable: true, length: 10, comment: '활동 카테고리' })
  category: Category;

  @Column('varchar', { name: 'title', nullable: true, length: 200, comment: '활동 이름' })
  title: string;

  @Column('varchar', { name: 'subtitle', nullable: true, length: 400, comment: '활동 부제목 (기간 etc)' })
  subtitle: string;

  @Column('varchar', { name: 'image', nullable: true, length: 400, comment: '활동 관련 사진' })
  image: string;

  @ManyToOne(() => AboutSopt, (aboutsopt) => aboutsopt.activities, {cascade:true})
  aboutSopt: AboutSopt;

}
