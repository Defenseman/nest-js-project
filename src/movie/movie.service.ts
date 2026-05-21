import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieDto } from "./dto/movie.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Actor, Movie, MoviePoster } from "generated/prisma/client";

@Injectable()
export class MovieService {
  constructor(private readonly prismaservice: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    return await this.prismaservice.movie.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
            age: true
          }
        },
        reviews: true,
        poster: true
      },

      take: 10, // how many records to fetch useful for pagination
      skip: 0   // how many records to skip before fetching, useful for pagination
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaservice.movie.findUnique({ 
      where: { id: id},
      include: {
        actors: {
          select: {
            id: true,
            name: true,
            age: true
          }
        },
        reviews: true,
        poster: true
      }
    });

    if (!movie) {
      throw new NotFoundException()
    } 

    return movie;
  }

  async create(movieData: MovieDto): Promise<Movie> {
    const { title, description, releaseYear, rating, genre, isWatched, actorIds, posterUrl } = movieData;

    let actors: Actor[] | null = null;

    if (actorIds && actorIds.length > 0) {
      actors = await this.prismaservice.actor.findMany({
        where: {
          id: {
            in: actorIds
          }
        }
      })
      
      if(!actors || actors.length !== actorIds.length) {
        throw new NotFoundException("One or more actors not found");
      }
    }

    return await this.prismaservice.movie.create({
      data: {
        title,
        description,
        releaseYear,
        rating,
        genre,
        isWatched,
        actors: {
          connect: actors?.map(actor => ({ id: actor.id }))
        },
        poster: posterUrl ? {
          create: {
            url: posterUrl
          }
        } : undefined
      }
    })

  }

  async update(id: string, movieData: MovieDto): Promise<Movie> {
    const movie = await this.prismaservice.movie.findUnique({
      where: {
        id
      }
    });
    
    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.prismaservice.movie.update({
      where: {
        id
      },
      data: movie
    });

    return movie;
  }

  async patch(id: string, movieData: Partial<MovieDto>): Promise<Movie> {
    const movie = await this.prismaservice.movie.findUnique({
      where: {
        id
      }
    })

    if (!movie) throw new NotFoundException();

    Object.assign(movie, movieData) // Update the existing movie entity with the new data from the DTO. This way we preserve the existing entity and only update the fields that are provided in the DTO.

    await this.prismaservice.movie.update({
      where: {
        id
      },
      data: movie
    })    

    return movie;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.prismaservice.movie.findUnique({
      where: {
        id
      }
    });
  
    if (!movie) throw new NotFoundException();

    await this.prismaservice.movie.delete({
      where: {
        id: movie.id
      }
    });

    return `Movie with id ${id} deleted`;
  }
}
