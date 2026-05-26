import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async login(dto: CreateUserDto) {
        const { email, name, password } = dto
        const existUser = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if (existUser) throw new ConflictException()

        return this.prismaService.user.create({
            data: {
                email,
                name,
                password
            }
        })
    }

}
