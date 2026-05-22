import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Request
        const isAdmin = request.headers['admin'] === 'true'

        if(!isAdmin) {
            throw new UnauthorizedException("You are not an admin")
        }
        return true
    }
}