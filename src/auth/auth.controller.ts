import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация нового пользователя', 
    description: 'Позволяет создать нового пользователя с уникальным email и именем'
  })
  @ApiOkResponse({ description: 'Пользователь успешно зарегистрирован', schema: { example: { accessToken: "eyJhbGciOiJIUzI1NiIsInR..." } } })
  @ApiBadRequestResponse({ description: 'Некорректные данные для регистрации' })
  @ApiConflictResponse({ description: 'Пользователь с таким email уже существует' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: CreateUserDto) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Авторизация пользователя', 
    description: 'Позволяет пользователю войти в систему, используя email и пароль'
  })
  @ApiOkResponse({ description: 'Пользователь успешно авторизован', schema: { example: { accessToken: "eyJhbGciOiJIUzI1NiIsInR..." } } })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginUserDto) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновление токена доступа', 
    description: 'Позволяет обновить токен доступа, используя refresh-токен из cookies'
  })
  @ApiOkResponse({ description: 'Токен доступа успешно обновлен', schema: { example: { accessToken: "eyJhbGciOiJIUzI1NiIsInR..." } } })
  @ApiUnauthorizedResponse({ description: 'Отсутствует или недействительный refresh-токен' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден или refresh-токен отсутствует' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Выход из системы', 
    description: 'Позволяет пользователю выйти из системы, удаляя refresh-токен из cookies'
  })
  @ApiOkResponse({ description: 'Пользователь успешно вышел из системы' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
