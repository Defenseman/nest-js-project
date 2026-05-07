import { Controller, Get } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller({
  path: "movies",
  host: ["localhost", "127.0.0.1"],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get("hello")
  async getMovies() {
    return this.movieService.getHello();
  }
}
