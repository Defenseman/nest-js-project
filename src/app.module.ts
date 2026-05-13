import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "./task/task.module";
import { MovieModule } from "./movie/movie.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config"; // needed to load environment variables from .env file
import { getTypeOrmConfig } from "./config/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true, // Make the configuration available globally
    }),
    TypeOrmModule.forRootAsync({ // Asynchronously load TypeORM configuration to make shure ConfigService is available
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: getTypeOrmConfig, // Use the factory function to get TypeORM configuration
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    TaskModule, 
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
