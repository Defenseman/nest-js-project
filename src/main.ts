import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { Logger } from "./common/middlewares/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(Logger);
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
  console.log("Server running on port " + (process.env.PORT ?? 3000));
}
bootstrap();
