import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/reviews.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { ActorEntity } from 'src/actors/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewsEntity, MovieEntity, ActorEntity])], // Import TypeOrmModule and specify the ReviewsEntity for this module
  controllers: [ReviewsController],
  providers: [ReviewsService, MovieService], // Provide the ReviewsService to handle business logic related to reviews, also provide MovieService to check if the movie exists before creating a review
}) 
export class ReviewsModule {}
