import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, PrimaryColumn, UpdateDateColumn, Generated } from 'typeorm';


export enum Genre {
    ACTION = "Action",
    COMEDY = "Comedy",
    DRAMA = "Drama",
    HORROR = "Horror",
}

@Entity({name: "movies"}) // Specify the table name in the database
export class MovieEntity {
    @PrimaryColumn()
    @Generated('uuid') // Generate a UUID for the primary key
    id: number;

    @Column({
        type: "varchar",
        length: 100,
    })
    title: string;

    @Column({
        type: "text",
        nullable: true, // Allow the description to be null in the database
    })
    description: string;

    @Column({
        name: "release_year", // Specify the column name in the database
        type: "int",
        unsigned: true, // Ensure the release year is a positive integer
    })
    releaseYear: number;

    @Column({
        type: "decimal",
        precision: 3, // Total number of digits
        scale: 1, // Number of digits after the decimal point
        default: 0.0, // Default rating is 0.0
    })
    rating: string;

    @Column({
        type: "enum",
        enum: Genre,
        default: Genre.ACTION, // Default genre is Action
    })
    genre: Genre;

    @Column({
        name: "is_watched", // Specify the column name in the database
        type: "boolean",
        default: false, // Default value for isWatched is false 
    })
    isWatched: boolean;
    
    @CreateDateColumn({
        name: "created_at", // Specify the column name in the database
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at", // Specify the column name in the database
    })
    updatedAt: Date;
}