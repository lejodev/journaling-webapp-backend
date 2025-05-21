import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity('tb_journal_entries')
export class Journal {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Index()
    @ManyToOne(() => User, (user) => user.journals, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'title', nullable: false })
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @Column({ name: 'journal_text', type: 'text', nullable: false })
    @IsNotEmpty()
    content: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
