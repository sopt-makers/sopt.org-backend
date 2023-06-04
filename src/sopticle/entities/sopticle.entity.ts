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

  static from(params: {
    part: Part;
    generation: number;
    thumbnailUrl: string;
    title: string;
    description: string;
    authorId: number;
    authorName: string;
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

    return sopticle;
  }
}
