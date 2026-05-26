import { IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Max, Min } from "class-validator";
import { Genre } from "../../../generated/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class MovieDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ title: "The title of the movie", type: String, example: "Pulp Fiction", required: true})
    title: string;

    @ApiProperty({ title: "The description of the movie", type: String, example: "The best movie ever", required: false})
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ title: "The actors of the movie", type: [String], example: ["123e4567-e89b-12d3-a456-426655440000", "123e4567-e89b-12d3-a456-426655440001"], required: false})
    @IsArray()
    @IsUUID("4", { each: true })
    @IsOptional()
    actorIds: string[];

    @ApiProperty({ title: "The director of the movie", type: [String], example: ["123e4567-e89b-12d3-a456-426655440000", "123e4567-e89b-12d3-a456-426655440001"], required: false})
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    direcrtors: string[];

    @IsInt()
    @IsNotEmpty()
    @Min(1888)
    @Max(new Date().getFullYear())
    @ApiProperty({ title: "The release year of the movie", example: 1994, type: Number, required: true })
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