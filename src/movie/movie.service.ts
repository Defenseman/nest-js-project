import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieEntity } from "./entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";
import { ActorEntity } from "src/actors/entities/actor.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity) 
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorsRepository: Repository<ActorEntity>
  ) {}

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

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({ 
      id
    });

    if (!movie) {
      throw new NotFoundException()
    }

    return movie;
  }

  async create(movieData: MovieDto): Promise<MovieEntity> {
    const { title, description, releaseYear, rating, genre, isWatched, actorIds } = movieData;

    const actors = await this.actorsRepository.find({
      where: {
        id: In(actorIds)
      }
    })

    if(!actors || actors.length !== actorIds.length) {
      throw new NotFoundException("One or more actors not found");
    }

    const movie = this.movieRepository.create({
      title,
      description,
      releaseYear,
      rating,
      genre,
      isWatched,
      actors
    }); // Create a new movie entity from the DTO outside of the database. 
    return await this.movieRepository.save(movie);
  }

  async update(id: string, movieData: MovieDto): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({
      id
    });
    
    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.movieRepository.save(movie); // Save the updated movie entity back to the database.

    return movie;
  }

  async patch(id: string, movieData: Partial<MovieDto>): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({
      id
    })

    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.movieRepository.save(movie); // Save the updated movie entity back to the database.
    return movie;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.movieRepository.findOneBy({
      id
    });
  
    if (!movie) throw new NotFoundException();

    await this.movieRepository.remove(movie);
    return movie.id;
  }
}
