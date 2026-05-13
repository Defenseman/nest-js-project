import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { TaskModule } from "src/task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([MovieEntity])], // Import TypeOrmModule and specify the entities for this module
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
