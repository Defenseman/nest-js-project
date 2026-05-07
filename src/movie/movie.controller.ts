import { Body, Controller, Get, Headers, Param, Post, Req, Res } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { type Request, type Response } from "express";

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

  @Get(":id")
  getMovieById(@Param("id") id: string) {
    return { id };
  }

  @Post()
  createMovie(@Body() body: { tittle: string; director: string }) {
    return { body };
  }

  @Get("headers")
  getAllHeaders(@Headers() headers: string) { // Получаем все заголовки
    return { headers };
  }

  @Get("user-agent")
  getUserAgentHeader(@Headers("user-agent") headers: string) { // Получаем только заголовок 'user-agent'
    return { headers };
  }

  @Get("request")
  getRequest(@Req() req: Request): any {
    return {
      headers: req.headers,
      url: req.url,
      method: req.method,
      query: req.query,
      params: req.params,
    };
  }

  @Get("response")
  getResponse(@Res() res: Response) {
    return res.status(201).json({ message: "Hello from response!" });
  }
}
