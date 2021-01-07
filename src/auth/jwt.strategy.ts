import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_CONFIG } from "config/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG().JWT_SECRET_KEY,
    })
  }

  async validate(payload) {
    const tokenUser: tokenInterface = { id: payload.id, userName: payload.userName, email: payload.email };
    return tokenUser
  }
}

export interface tokenInterface {
  id: string;
  userName: string,
  email: string
}