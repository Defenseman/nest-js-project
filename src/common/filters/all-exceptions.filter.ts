import { ArgumentsHost, Catch, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        const message = exception instanceof HttpException ? exception.message : "Internal Server Error";

        this.logger.error(message)

        response
            .status(status)
            .json({
                status,
                message,
                timestamp: new Date().toISOString(),
                path: ctx.getRequest().url
            })
        }
}