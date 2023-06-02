import { Part } from '../../common/type';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SopticleLike } from './sopticleLike.entity';

@Index('sopticle_pk', ['id'], { unique: true })
@Entity('Sopticle', { schema: 'public' })
export class Sopticle {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column({ length: 20 })
  part: Part;

  @Column()
  generation: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailUrl: string | null;

  @Column({ type: 'varchar', length: 100 })
  title: string | null;

  @Column({ type: 'varchar', length: 600 })
  description: string | null;

  @Column()
  authorId: number;

  @Column({ length: 20 })
  authorName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  authorProfileImageUrl: string | null;

  @Column({ length: 500 })
  sopticleUrl: string;

  @Column({ comment: '스크랩 로드 여부. 로드 실패시 false, 성공시 true' })
  load: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likeCount: number;

  @OneToMany(() => SopticleLike, (sopticleLike) => sopticleLike.sopticle, {
    onDelete: 'CASCADE',
  })
  sopticleLikes: SopticleLike[];
}
