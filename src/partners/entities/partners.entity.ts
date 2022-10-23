import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('partner_pk', ['id'], { unique: true })
@Index('partner_id_uindex', ['id'], { unique: true })
@Entity('Partner', { schema: 'public' })
export class Partner {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('varchar', { name: 'image', nullable: true, length: 500 })
  image: string | null;
}
