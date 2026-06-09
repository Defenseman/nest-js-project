import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'example@example.com', description: 'Email пользователя'})
    @IsString({ message: 'Email должен быть строкой' })
    @IsNotEmpty({ message: 'Email это обязательное поле' })
    @IsEmail({},{ message: 'Некорректный email' })
    @MaxLength(50)
    email: string;

    @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль это обязательное поле' })
    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    @MaxLength(150, { message: 'Пароль должен быть не более 150 символов' })
    password: string;
}