import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Part } from '../../common/type';

@Index('review_pk', ['id'], { unique: true })
@Entity('Review', { schema: 'public' })
export class Review {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: false, length: 200 })
  title: string;

  @Column('varchar', { name: 'reviewer', nullable: false, length: 20 })
  reviewer: string;

  @Column('integer', { name: 'semester', nullable: false })
  semester: number;

  @Column('varchar', { name: 'part', nullable: false, length: 10 })
  part: Part;

  @Column('varchar', { name: 'subject', nullable: false, length: 20 })
  subject: string;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 500 })
  thumbnail: string;

  @Column('varchar', { name: 'platform', nullable: false, length: 50 })
  platform: string;

  @Column('varchar', { name: 'link', nullable: false, length: 500 })
  link: string;
}
