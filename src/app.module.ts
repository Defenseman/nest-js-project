import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MovieModule } from "./movie/movie.module";
import { ConfigModule } from "@nestjs/config"; // needed to load environment variables from .env file
import { ReviewsModule } from './reviews/reviews.module';
import { PosterModule } from './poster/poster.module';
import { ActorsModule } from './actors/actors.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true, // Make the configuration available globally
    }),
    PrismaModule,
    MovieModule, ReviewsModule, PosterModule, ActorsModule, PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
