import { ActorEntity } from 'src/actors/entities/actor.entity';
import { ReviewsEntity } from 'src/reviews/entities/reviews.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
    ACTION = "Action",
    COMEDY = "Comedy",
    DRAMA = "Drama",
    HORROR = "Horror",
}

@Entity({name: "movies"})
export class MovieEntity {
    @PrimaryGeneratedColumn("uuid") // Auto-incrementing primary key
    id: string;

    @Column({
        type: "varchar",
        length: 100,
    })
    title: string;

    @Column({
        type: "text",
        nullable: true,
    })
    description: string;

    @Column({
        name: "release_year",
        type: "int",
        unsigned: true, // Ensure the release year is a positive integer
    })
    releaseYear: number;

    @Column({
        type: "decimal",
        precision: 3, // Total number of digits
        scale: 1, // Number of digits after the decimal point
        default: 0.0,
    })
    rating: number;

    @Column({
        type: "enum",
        enum: Genre,
        default: Genre.ACTION,
    })
    genre: Genre;

    @Column({
        name: "is_watched",
        type: "boolean",
        default: false,
    })
    isWatched: boolean;

    @Column({
        name: "poster_id",
        type: "uuid",
        nullable: true,
    })
    posterId: string; // Foreign key to the MoviePosterEntity, allowing null values for movies without posters

    @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
        onDelete: "CASCADE", 
        nullable: true
    }) // Define a one-to-one relationship with the MoviePosterEntity, allowing null values for movies without posters
    @JoinColumn({ name: "poster_id" }) // Specify the foreign key column name in the MovieEntity
    poster: MoviePosterEntity | null; // Each movie can have one poster, and we reference the poster's id as the foreign key.

    @ManyToMany(() => ActorEntity, (actor) => actor.movies, {nullable: true})
    @JoinTable({
        name: "movie_actors", // Name of the join table
        joinColumn: {
            name: "movie_id", // Name of the foreign key column in the join table referencing MovieEntity
            referencedColumnName: "id", // Name of the primary key column in MovieEntity
        },
        inverseJoinColumn: {
            name: "actor_id", // Name of the foreign key column in the join table referencing ActorEntity
            referencedColumnName: "id", // Name of the primary key column in ActorEntity
        }
    })
    actors: ActorEntity[] | null; // Each movie can have multiple actors, and we reference the actor's id as the foreign key.


    @OneToMany(() => ReviewsEntity, (review) => review.movie) // Define a one-to-many relationship with the Reviews entity  
    reviews: ReviewsEntity[]; // Each movie can have multiple reviews, and we reference the review's id as the foreign key.

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;

}