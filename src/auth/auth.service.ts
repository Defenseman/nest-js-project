import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, verify } from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';
import { isDev } from 'src/utils/is-dev.util';
import { timeToTimeStamp } from 'src/utils/timeToTimeStamp';

@Injectable()
export class AuthService {
    private readonly JWT_ACCESS_TOKEN_TTL: string;
    private readonly JWT_REFRESH_TOKEN_TTL: string;

    private readonly COOKIE_DOMAIN: string;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
        this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
        this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
    }

    async register(res: Response,dto: CreateUserDto) {
        const { email, name, password } = dto
        const existUser = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if (existUser) throw new ConflictException("Такой пользователь уже существует")

        const user = await this.prismaService.user.create({
            data: {
                email,
                name,
                password: await hash(password)
            }
        })
        return this.auth(res, user.id)
    }

    async login(res: Response, dto: LoginUserDto) {
        const { email, password } = dto
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                password: true
            }
        })

        if (!user) throw new NotFoundException("Пользователь не найден")

        const isValidPassword = await verify(user.password, password)

        if (!isValidPassword) throw new NotFoundException("Пользователь не найден")

        return this.auth(res, user.id)
    }

    async refresh(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        if (!refreshToken) throw new UnauthorizedException("Не действительный refresh-токен")

        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken)

        if (!payload) throw new UnauthorizedException("Не действительный refresh-токен")

        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.id
            },
            select: {
                id: true
            }
        })

        if (!user) throw new NotFoundException("Пользователь не найден")

        return this.auth(res, user.id)
    }

    logout(res: Response) {
        this.setCookies(res, '', new Date(0))
        return { message: 'Успешный выход из системы' }
    }

    private auth(res: Response, userId: string) {
        const { accessToken, refreshToken } = this.generateTokens(userId)
        this.setCookies(res, refreshToken, new Date(Date.now() + timeToTimeStamp(this.JWT_REFRESH_TOKEN_TTL)))

        return { accessToken }
    }

    private generateTokens(id: string) {
        const payload: JwtPayload = { id }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL as JwtSignOptions["expiresIn"]
        })
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL as JwtSignOptions["expiresIn"]
        })

        return { accessToken, refreshToken }
    }

    private setCookies(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            secure: !isDev(this.configService), // true - allows cookies to be sent over HTTPS only
            sameSite: isDev(this.configService) ? 'none' : 'lax' 
        })
    }

}
