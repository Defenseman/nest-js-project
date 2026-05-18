import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "reviews"})
export class ReviewsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({type: "text"})
    text: string;

    @Column({
        type: "decimal",
        precision: 3, // Total number of digits
        scale: 1, // Number of digits after the decimal point
        default: 0.0, 
    })
    rating: number;

    @Column({
        name: "movie_id", 
        type: "uuid", 
    })
    movieId: string; // Foreign key column to reference the Movie entity

    @ManyToOne(() => MovieEntity, movie => movie.reviews, {
        onDelete: "CASCADE", // When a movie is deleted, also delete its reviews
    }) 
    @JoinColumn({ name: "movie_id" }) // Specify the foreign key column name in the database
    movie: MovieEntity; // Each review belongs to one movie, and we reference the movie's id as the foreign key.

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;
}