import { DEFAULT_SEMESTER_LOGO } from 'src/utils/constants';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('semester_pk', ['id'], { unique: true })
@Index('semester_id_uindex', ['id'], { unique: true })
@Entity('Semester', { schema: 'public' })
export class Semester {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'history', nullable: true })
  history: string | null;

  @Column('character varying', { name: 'color', nullable: true, length: 7 })
  color: string | null;

  @Column('text', {
    name: 'logo',
    nullable: true,
    default: () => DEFAULT_SEMESTER_LOGO,
  })
  logo: string | null;

  @Column('text', { name: 'background', nullable: true })
  background: string | null;

  @Column('character varying', { name: 'name', nullable: true, length: 30 })
  name: string | null;

  @Column('character varying', { name: 'year', length: 10 })
  year: string;

  @Column('character varying', {
    name: 'coreValue',
    nullable: true,
    length: 100,
  })
  coreValue: string | null;

  @Column('text', { name: 'coreImage', nullable: true })
  coreImage: string | null;
}
