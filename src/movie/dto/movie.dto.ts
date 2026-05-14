import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { Genre } from "../entities/movie.entity";



export class MovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @IsDecimal({ decimal_digits: '1' })
    rating: string;

    @IsEnum(Genre)
    @IsOptional()
    genre: Genre;

    @IsBoolean()
    @IsOptional()
    isWatched: boolean;
}