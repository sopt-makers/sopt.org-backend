import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Part } from '../../common/type';
import { Sopticle } from '../../sopticle/entities/sopticle.entity';

@Index('review_pk', ['id'], { unique: true })
@Entity('Review', { schema: 'public' })
export class Review {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: false, length: 200 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 600 })
  description: string;

  @Column('varchar', { name: 'author', nullable: false, length: 20 })
  author: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  authorProfileImageUrl: string | null;

  @Column('integer', { name: 'generation', nullable: false })
  generation: number;

  @Column('varchar', { name: 'part', nullable: false, length: 10 })
  part: Part;

  @Column('varchar', { name: 'subject', nullable: false, length: 20 })
  subject: string;

  @Column('varchar', { name: 'thumbnailUrl', nullable: true, length: 500 })
  thumbnailUrl: string;

  @Column('varchar', { name: 'platform', nullable: false, length: 50 })
  platform: string;

  @Column('varchar', { name: 'url', nullable: false, length: 500 })
  url: string;

  static from(params: {
    title: string;
    author: string;
    part: Part;
    generation: number;
    subject: string;
    thumbnailUrl: string;
    platform: string;
    url: string;
    description: string;
  }) {
    const review = new Review();
    const {
      title,
      author,
      generation,
      part,
      subject,
      thumbnailUrl,
      platform,
      url,
      description,
    } = params;
    review.title = title;
    review.author = author;
    review.generation = generation;
    review.part = part;
    review.subject = subject;
    review.thumbnailUrl = thumbnailUrl;
    review.platform = platform;
    review.url = url;
    review.description = description;
    return review;
  }
}
