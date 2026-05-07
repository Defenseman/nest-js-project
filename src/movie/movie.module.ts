import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { TaskModule } from "src/task/task.module";

@Module({
  imports: [TaskModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
