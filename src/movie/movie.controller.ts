import { Body, Controller, Get, Post } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Controller({
  path: "movies",
  host: ["localhost", "127.0.0.1"],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateMovieDto) {
    return await this.movieService.create(dto);
  }
}
