import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UserAgent = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request;
        const user = request.headers['user-agent'];

        return user
    }
)