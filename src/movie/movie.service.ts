import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieEntity } from "./entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";

@Injectable()
export class MovieService {
  constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({ 
      // where: {
      //   isWatched: false,
      // }, 
      order: { 
        createdAt: "desc" 
      } 
    });
  }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({ 
      id
    });

    if (!movie) {
      throw new NotFoundException()
    }

    return movie;
  }

  async create(movieData: MovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(movieData); // Create a new movie entity from the DTO outside of the database. 
    return await this.movieRepository.save(movie);
  }

  async update(id: number, movieData: MovieDto): Promise<MovieDto> {
    const movie = await this.movieRepository.findOneBy({
      id
    });
    
    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.movieRepository.save(movie); // Save the updated movie entity back to the database.

    return movie;
  }

  async patch(id: number, movieData: Partial<MovieDto>): Promise<MovieDto> {
    const movie = await this.movieRepository.findOneBy({
      id
    })

    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.movieRepository.save(movie); // Save the updated movie entity back to the database.
    return movie;
  }

  async delete(id: number): Promise<number> {
    const movie = await this.movieRepository.findOneBy({
      id
    });
  
    if (!movie) throw new NotFoundException();

    await this.movieRepository.remove(movie);
    return movie.id;
  }
}
