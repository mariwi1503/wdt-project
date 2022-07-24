import { Blog } from "src/modules/blog/entities/blog.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToMany((type) => Blog, (blog) => blog.genres)
    blogs: Blog[]

}