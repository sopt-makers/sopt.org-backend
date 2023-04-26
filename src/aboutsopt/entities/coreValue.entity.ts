import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AboutSopt } from './aboutsopt.entity';

@Index('core_value_pk', ['id'], { unique: true })
@Entity('CoreValue', { schema: 'public' })
export class CoreValue {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id', comment: '기본키' })
  id: number;

  @Column('varchar', { nullable: false, length: 100, comment: '코어 벨류' })
  title: string;

  @Column('varchar', { nullable: false, length: 100, comment: '코어벨류 설명' })
  subTitle: string;

  @Column('varchar', { nullable: false, length: 400, comment: '이미지 주소' })
  imageUrl: string;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => AboutSopt, (aboutSopt: AboutSopt) => aboutSopt.coreValues)
  aboutSopt: AboutSopt;
}
