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
import { SopticleAuthor } from './sopticle-author.entity';

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
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 600 })
  description: string;

  @Column()
  authorId: number;

  @Column({ length: 20 })
  authorName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  authorProfileImageUrl: string | null;

  @Column({ length: 500, unique: true })
  sopticleUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ comment: 'PG에서 사용하는 SopticleId' })
  pgSopticleId: number;

  @OneToMany(() => SopticleLike, (sopticleLike) => sopticleLike.sopticle, {
    onDelete: 'CASCADE',
  })
  sopticleLikes: SopticleLike[];

  @OneToMany(
    () => SopticleAuthor,
    (sopticleAuthor) => sopticleAuthor.sopticle,
    { onDelete: 'CASCADE' },
  )
  authors: SopticleAuthor[];

  static from(params: {
    part: Part;
    generation: number;
    thumbnailUrl: string;
    title: string;
    description: string;
    authorId: number;
    authorName: string;
    pgSopticleId: number;
    authorProfileImageUrl: string | null;
    sopticleUrl: string;
  }): Sopticle {
    const {
      part,
      generation,
      thumbnailUrl,
      title,
      description,
      authorId,
      authorName,
      pgSopticleId,
      authorProfileImageUrl,
      sopticleUrl,
    } = params;

    const sopticle = new Sopticle();
    sopticle.part = part;
    sopticle.generation = generation;
    sopticle.thumbnailUrl = thumbnailUrl;
    sopticle.title = title;
    sopticle.description = description;
    sopticle.authorId = authorId;
    sopticle.authorName = authorName;
    sopticle.authorProfileImageUrl = authorProfileImageUrl;
    sopticle.sopticleUrl = sopticleUrl;
    sopticle.pgSopticleId = pgSopticleId;
    return sopticle;
  }
}
