import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { Logger } from "./common/middlewares/logger.middleware";
import { AuthGuard } from "./common/guard/auth.guard";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(Logger);
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalGuards(new AuthGuard()); // globally connected AuthGuard

  await app.listen(process.env.PORT ?? 3000);
  console.log("Server running on port " + (process.env.PORT ?? 3000));
}
bootstrap();
