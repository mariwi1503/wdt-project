import { Genre } from "src/modules/genre/entities/genre.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToMany((type) => Genre, (genres) => genres.blogs, {
        cascade: ['insert'],
    })
    @JoinTable()
    genres: Genre[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}