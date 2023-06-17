import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Sopticle } from './sopticle.entity';

@Index('sopticle_like_pk', ['id'], { unique: true })
@Entity('SopticleLike', { schema: 'public' })
export class SopticleLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sopticle, (sopticle) => sopticle.sopticleLikes)
  sopticle: Sopticle;

  @Column('varchar', { length: 50 })
  sessionId: string;

  @CreateDateColumn()
  createdAt: Date;
}
