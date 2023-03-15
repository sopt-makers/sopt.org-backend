import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('varchar', { name: 'part', nullable: false , length: 10})
  part: string;

  @Column('varchar', { name: 'subject', nullable: false, length: 20 })
  subject: string;

  @Column('varchar', { name: 'platform', nullable: false, length: 50 })
  platform: string;

  @Column('varchar', { name: 'link', nullable: false, length: 500 })
  link: string;
}