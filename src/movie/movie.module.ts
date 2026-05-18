import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { TaskModule } from "src/task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { ActorEntity } from "src/actors/entities/actor.entity";
import { MoviePosterEntity } from "./entities/poster.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity, MoviePosterEntity]), TaskModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
