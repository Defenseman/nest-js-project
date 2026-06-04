import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsString({ message: 'Email должен быть строкой' })
    @IsNotEmpty({ message: 'Email это обязательное поле' })
    @IsEmail({},{ message: 'Некорректный email' })
    @MaxLength(50)
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль это обязательное поле' })
    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    @MaxLength(150, { message: 'Пароль должен быть не более 150 символов' })
    password: string;
}