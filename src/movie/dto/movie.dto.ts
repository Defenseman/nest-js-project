import { IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Max, Min } from "class-validator";
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

    @IsNumber()
    @Min(0.0)
    @Max(10.0)
    @IsOptional()
    rating: number;

    @IsEnum(Genre)
    @IsOptional()
    genre: Genre;

    @IsBoolean()
    @IsOptional()
    isWatched: boolean;

    @IsUrl()
    @IsOptional()
    posterUrl: string;
}