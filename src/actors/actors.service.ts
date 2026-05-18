import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {
    constructor(@InjectRepository(ActorEntity) private readonly actorRepository: Repository<ActorEntity>) {}
    async create(dto: CreateActorDto): Promise<ActorEntity> {
        const { name, age } = dto;

        const actor = this.actorRepository.create({ name, age });
        return await this.actorRepository.save(actor);
    }
}
