import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('notification_list_pk', ['id'], { unique: true })
@Entity('Notification', { schema: 'public' })
export class Notification {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id', comment: '기본키' })
  id: number;

  @Column({ nullable: false })
  generation: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  static from(params: { generation: number; email: string }): Notification {
    const { generation, email } = params;

    const notification = new Notification();
    notification.generation = generation;
    notification.email = email;
    return notification;
  }
}
