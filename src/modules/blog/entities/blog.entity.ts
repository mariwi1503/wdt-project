import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    "draft" = "draft",
    "published" = "published",
    "blocked" = "blocked"
}

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ type: 'enum', enum: Status})
    status: Status

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}