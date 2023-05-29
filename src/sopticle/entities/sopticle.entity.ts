import { Part } from '../../common/type';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SopticleLike } from './sopticleLike.entity';

@Entity('Sopticle', { schema: 'public' })
export class Sopticle {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column({ length: 20 })
  part: Part;

  @Column()
  generation: number;

  @Column({ length: 500, nullable: true })
  thumbnailUrl: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  authorId: number;

  @Column({ length: 20 })
  authorName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  authorProfileImageUrl: string | null;

  @Column({ length: 500 })
  sopticleUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likeCount: number;

  @OneToMany(() => SopticleLike, (sopticleLike) => sopticleLike.sopticle, {
    onDelete: 'CASCADE',
  })
  sopticleLikes: SopticleLike[];
}
