import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { TaskModule } from "src/task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { ActorsService } from "src/actors/actors.service";
import { ActorEntity } from "src/actors/entities/actor.entity";
import { ReviewsEntity } from "src/reviews/entities/reviews.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity]), TaskModule], // Import TypeOrmModule and specify the MovieEntity for this module, also import TaskModule to use its services in MovieModule
  controllers: [MovieController],
  providers: [MovieService, ActorsService],
})
export class MovieModule {}
