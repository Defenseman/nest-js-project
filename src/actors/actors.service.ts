import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActorsService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(dto: CreateActorDto): Promise<Actor> {
        const { name, age } = dto;

        const actor = this.prismaService.actor.create({
            data: {
                name,
                age
            }
        })
        return actor
    }
}
