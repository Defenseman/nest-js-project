import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export async function getTypeOrmConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
    return {
        type: "postgres",
        host: configService.getOrThrow("POSTGRES_HOST"),
        port: parseInt(configService.getOrThrow("POSTGRES_PORT") || "5433"),
        username: configService.getOrThrow("POSTGRES_USER"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        database: configService.getOrThrow("POSTGRES_DB"),
        entities: [],
        autoLoadEntities: true, // Automatically load entities from the modules
        synchronize: true,      // Automatically synchronize the database schema (do not use in production)
    }
}