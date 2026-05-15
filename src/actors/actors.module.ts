import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { ActorEntity } from './entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';
import { MovieEntity } from 'src/movie/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
