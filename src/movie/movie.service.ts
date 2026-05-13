import { Injectable } from "@nestjs/common";
import { MovieEntity } from "./entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MovieService {
  constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({order: {createdAt: "desc"}});
  }

  async create(movieData: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(movieData); // Create a new movie entity from the DTO outside of the database. 
    return await this.movieRepository.save(movie);
  }
}
