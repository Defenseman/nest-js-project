import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "actors"})
export class ActorEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", length: 100})
    name: string;

    @Column({type: "int", unsigned: true})
    age: number;

    @ManyToMany(() => MovieEntity, (movie) => movie.actors) // Define a many-to-many relationship with the Movie entity
    movies: MovieEntity[]; // Each actor can be in multiple movies, and we reference the movie's id as the foreign key.

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;
}