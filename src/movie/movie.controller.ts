import { Body, Controller, Delete, Get, Header, Headers, HttpStatus, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import { AdminGuard } from "src/common/guard/admin.guard";
import { UserAgent } from "src/common/decorators/user-agent.decorator";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";
import { ApiBody, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Movies")
@UseInterceptors(LoggingInterceptor)
@Controller({
  path: "movies",
  host: ["localhost", "127.0.0.1"],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @ApiOperation({summary: "Получить все фильмы", description: "Возвращет все фильмы"})
  @ApiResponse({status: HttpStatus.OK, type: [MovieDto]})
  @ApiNotFoundResponse({description: "Фильмы не найдены", example: {message: "Movie not found"}})
  @Get()
  findAll() {                                   // do not have to specify async, await here because we are returning the promise directly, and NestJS will handle it correctly.
    return this.movieService.findAll();        
  }

  @ApiOperation({summary: "Получить фильм по id", description: "Возвращет фильм по id"})
  @ApiOkResponse({ type: MovieDto })
  @ApiNotFoundResponse({description: "Фильм не найден", example: { status: HttpStatus.NOT_FOUND, message: "Movie not found", timeStamp: new Date().toISOString(), path: "/movies/:id" }})
  @UseGuards(AdminGuard)
  @ApiHeader({schema: { type: "string", example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."}, name: "authorization", required: true})
  @Get(":id")
  findById(@Param("id") id: string, @UserAgent() userAgent: string, @Headers() headers) { // Additionally we cat use ApiQuery, ApiParam decorators, but this is the best way
    console.log("UserAgent:", userAgent);
    console.log("Headers:", headers);
    return this.movieService.findById(id); // Convert the id from string to number using the unary plus operator 
  }


  @ApiBody({
    schema: { 
      type: "object", 
      properties: { 
        tittle: { type: "string", example: "The Matrix"},
        releaseYear: { type: "number", example: 1999}
      } 
    }
  })
  @ApiHeader({name: "authorization", required: true})
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Patch(":id")
  patch(@Param("id") id: string, @Body() dto: Partial<MovieDto>) {
    return this.movieService.patch(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(id);
  }
}
