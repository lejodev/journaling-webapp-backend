import { Journal } from 'src/modules/journal/entities/journal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToMany(() => Journal, (journal) => journal.user)
  journals: Journal[];

  @Index()
  @Column({ name: 'username', unique: true, nullable: false })
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @Column({ name: 'fullname', nullable: false })
  @IsNotEmpty()
  fullname: string;

  @Index()
  @Column({ name: 'email', unique: true, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ name: 'passwordhash', nullable: false })
  @MinLength(6)
  passwordhash: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}
