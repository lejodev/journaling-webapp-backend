import { Journal } from "src/modules/journal/entities/journal.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity('tb_user')
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: number;

    @OneToMany(() => Journal, (journal) => journal.userId)
    journals: Journal[];

    @Index()
    @Column({name: 'username', unique: true, nullable: false})
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @Column({name: 'name', nullable: false})
    @IsNotEmpty()
    name: string;

    @Index()
    @Column({name: 'email', unique: true, nullable: false})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({name: 'password', nullable: false, select: false})
    @MinLength(6)
    password: string;

    @Column({name: 'is_active', default: true})
    isActive: boolean;

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
