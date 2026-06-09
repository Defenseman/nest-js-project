import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtPayload } from "../interfaces/jwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
            ignoreExpiration: false,
            algorithms: ['HS256'],
        })
    }

    async validate( payload: JwtPayload) { // this method will be called automatically by passport after verifying the token
        const user = await this.authService.validateUser(payload.id)
        return user
    }
}