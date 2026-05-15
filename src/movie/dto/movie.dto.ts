import { IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { Genre } from "../entities/movie.entity";



export class MovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsUUID("4", { each: true })
    @IsOptional()
    actorIds: string[];

    @IsInt()
    @IsNotEmpty()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @IsDecimal({ decimal_digits: '1' })
    @IsOptional()
    rating: string;

    @IsEnum(Genre)
    @IsOptional()
    genre: Genre;

    @IsBoolean()
    @IsOptional()
    isWatched: boolean;
}