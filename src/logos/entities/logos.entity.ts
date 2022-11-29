import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('logo_id_uindex', ['id'], { unique: true })
@Index('logo_pk', ['id'], { unique: true })
@Entity('Logo', { schema: 'public' })
export class Logo {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'image', nullable: true, length: 500 })
  image: string | null;

  @Column({ type: 'integer', name: 'semesterId', nullable: false })
  semesterId: number;
}
