import { DocumentBuilder } from "@nestjs/swagger";

export const getSwaggerConfig = () => {
    return new DocumentBuilder()
        .setTitle("NestJS API")
        .setDescription("A simple NestJS Rest API")
        .setVersion("1.0.0")
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            in: "header",
        })
        .build();
}