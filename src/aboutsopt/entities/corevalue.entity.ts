import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AboutSopt } from './aboutsopt.entity';

@Index('corevalue_pk', ['id'], { unique: true })
@Entity('CoreValue', { schema: 'public' })
export class CoreValue {
  @PrimaryGeneratedColumn('increment',{ type: 'integer', name: 'id' })
  id: number;

  @Column('integer',{ name: 'semester', nullable: true, comment: '기수'})
  semester: number;

  @Column('varchar', { name: 'corevalue', nullable: true, length: 400, comment: '핵심가치 이름' })
  corevalue: string;
  
  @Column('varchar', { name: 'coreimage', nullable: true, length: 400, comment: '핵심가치 사진' })
  coreimage: string;
  
  @ManyToOne(() => AboutSopt, (aboutsopt) => aboutsopt.corevalues)
  aboutsopt: AboutSopt;

}


