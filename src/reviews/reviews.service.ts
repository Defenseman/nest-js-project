import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from 'generated/prisma/client';

@Injectable()
export class ReviewsService {
    constructor(
        private readonly prismaservice: PrismaService,
) {}

    async create(reviewData: CreateReviewDto): Promise<Review> {
        const { movieId, text, rating } = reviewData;

        const movie = await this.prismaservice.movie.findUnique({
            where: {
                id: movieId
            }
        }); 

        if (!movie) throw new NotFoundException();

        const review = this.prismaservice.review.create({ 
            data: {
                content: text,
                rating,
                movie: {
                    connect: {
                        id: movieId
                    }
                }
            }
        });

        return review;
    }
}