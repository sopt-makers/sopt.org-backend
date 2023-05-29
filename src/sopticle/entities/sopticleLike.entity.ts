import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Sopticle } from './sopticle.entity';

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
