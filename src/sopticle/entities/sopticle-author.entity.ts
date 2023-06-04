import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Part } from '../../common/type';
import { Sopticle } from './sopticle.entity';

@Index('SopticleAuthor_pk', ['id'], { unique: true })
@Entity('SopticleAuthor', { schema: 'public' })
export class SopticleAuthor {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column()
  pgUserId: number;

  @Column({ length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  profileImage: string | null;

  @Column()
  generation: number;

  @Column({ length: 20 })
  part: Part;

  @ManyToOne(() => Sopticle, (sopticle) => sopticle.authors)
  sopticle: Sopticle;

  static from(params: {
    pgUserId: number;
    name: string;
    profileImage: string | null;
    part: Part;
    generation: number;
    sopticle: Sopticle;
  }) {
    const author = new SopticleAuthor();
    const { pgUserId, name, profileImage, part, generation, sopticle } = params;
    author.pgUserId = pgUserId;
    author.name = name;
    author.profileImage = profileImage;
    author.generation = generation;
    author.part = part;
    author.sopticle = sopticle;
    return author;
  }
}
