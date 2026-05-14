import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";

@Controller({
  path: "movies",
  host: ["localhost", "127.0.0.1"],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {                                   // do not have to specify async, await here because we are returning the promise directly, and NestJS will handle it correctly.
    return this.movieService.findAll();        
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.movieService.findById(+id); // Convert the id from string to number using the unary plus operator 
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: MovieDto) {
    return this.movieService.update(+id, dto);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() dto: Partial<MovieDto>) {
    return this.movieService.patch(+id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(+id);
  }
}
