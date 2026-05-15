import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Repository } from 'typeorm';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewsEntity) 
        private readonly reviewsRepository: Repository<ReviewsEntity>,
        private readonly movieService: MovieService,
) {}

    async create(reviewData: CreateReviewDto): Promise<ReviewsEntity> {
        const { movieId, text, rating } = reviewData;

        const movie = await this.movieService.findById(movieId); 

        if (!movie) throw new NotFoundException();

        const review = this.reviewsRepository.create({ 
            movieId, text, rating
        });

        return await this.reviewsRepository.save(review);
    }
}