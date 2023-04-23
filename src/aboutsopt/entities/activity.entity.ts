import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AboutSopt } from './aboutsopt.entity';

@Index('activity_pk', ['id'], { unique: true })
@Entity('Activity', { schema: 'public' })
export class Activity {
  @PrimaryGeneratedColumn('increment',{ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'semester', nullable: true, length: 400, comment: '기수' })
  semester: string;

  @Column('varchar', { name: 'title', nullable: true, length: 400, comment: '활동 이름' })
  title: string;

  @Column('varchar', { name: 'subtitle', nullable: true, length: 400, comment: '활동 부제목 (기간 etc)' })
  subtitle: string;

  @Column('varchar', { name: 'image', nullable: true, length: 400, comment: '활동 관련 사진' })
  image: string;

  @ManyToOne(() => AboutSopt, (aboutsopt) => aboutsopt.activities)
  aboutSopt: AboutSopt;

}
