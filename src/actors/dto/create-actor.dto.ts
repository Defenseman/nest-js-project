import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    age: number;
}