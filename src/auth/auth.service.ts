import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, verify } from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    private readonly JWT_SECRET: string;
    private readonly JWT_ACCESS_TOKEN_TTL: string;
    private readonly JWT_REFRESH_TOKEN_TTL: string;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_SECRET = this.configService.getOrThrow('JWT_SECRET');
        this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL');
        this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL');
    }

    async register(dto: CreateUserDto) {
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
        return this.generateTokens(user.id)
    }

    async login(dto: LoginUserDto) {
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

        return this.generateTokens(user.id)
    }

    private async generateTokens(id: string) {
        const payload: JwtPayload = { id }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL as JwtSignOptions["expiresIn"]
        })
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL as JwtSignOptions["expiresIn"]
        })

        return { accessToken, refreshToken }
    }



}
