import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity('tb_journal')
export class Journal {
    @PrimaryGeneratedColumn({ name: 'journal_id' })
    id: number;

    @Index()
    @ManyToOne(() => User, (user) => user.journals, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: User;

    @Column({ name: 'title', nullable: false })
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @Column({ name: 'content', type: 'text', nullable: false })
    @IsNotEmpty()
    content: string;

    @Column({ name: 'is_public', default: false })
    isPublic: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
