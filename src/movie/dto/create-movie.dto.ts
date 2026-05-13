import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear: number;
}