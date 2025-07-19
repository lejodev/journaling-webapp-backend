import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity('tb_journal_entries')
export class Journal {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Index()
  @ManyToOne(() => User, (user) => user.journals, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'title', nullable: false })
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Column({ name: 'journal_text', type: 'text', nullable: false })
  @IsNotEmpty()
  content: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}
