import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum User_status {
    "active" = "active",
    "banned" = "banned"
}

export enum User_role {
    "user" = "user",
    "admin" = "admin"
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

    @Column({type: 'enum', enum: User_role})
    role: User_role

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}