import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { Logger } from "./common/middlewares/logger.middleware";
import { AuthGuard } from "./common/guard/auth.guard";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MovieModule } from "./movie/movie.module";
import { MovieDto } from "./movie/dto/movie.dto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(Logger);
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new AuthGuard()); // globally connected AuthGuard

  const config = new DocumentBuilder()
    .setTitle("Movie API")
    .setDescription("Movie API description")
    .setVersion("1.0")
    .setContact("John Doe",  "https://github.com", "example@mail.ex")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule], // this settigs specifies which modules should be included in the generated documentation
    extraModels: [MovieDto], // include the MovieDto in the generated documentation, even though it's not specified in the MovieController
  });

  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: '/docs-json',
    yamlDocumentUrl: '/docs-yaml',
    customSiteTitle: 'Movie API Documentation',
    customfavIcon: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-funny-react-png-image_3530386.jpg'
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log("Server running on port " + (process.env.PORT ?? 3000));
}
bootstrap();
