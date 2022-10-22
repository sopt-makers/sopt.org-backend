import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('cooperation_project_pk', ['id'], { unique: true })
@Index('cooperation_project_id_uindex', ['id'], { unique: true })
@Entity('CooperationProject', { schema: 'public' })
export class CooperationProject {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'year', nullable: true })
  year?: number | null;

  @Column('varchar', { name: 'title', nullable: true, length: 50 })
  title?: string | null;

  @Column('varchar', { name: 'content', nullable: true, length: 300 })
  content?: string | null;

  @Column('varchar', {
    name: 'subContent',
    nullable: true,
    length: 300,
  })
  subContent?: string | null;

  @Column('varchar', {
    name: 'posterImage',
    nullable: true,
    length: 500,
  })
  posterImage?: string | null;
}
