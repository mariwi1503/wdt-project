import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum User_status {
    "active" = "active",
    "banned" = "banned"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column({type: 'enum', enum: User_status})
    status: User_status

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}