import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

type RequestWithCookies = Request & {
  cookies?: Record<string, string>;
};

// function to extract the token from cookies
const cookieExtractor = (req: RequestWithCookies | undefined) => {
  if (req && req.cookies) {
    return req.cookies["access_token"];
  }
  return null;
};

interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

// This register the jwt guard on passport
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Accept token either from cookie (HttpOnly) or from Authorization header
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => cookieExtractor(req as RequestWithCookies),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>("authSecret") ??
        (process.env.AUTH_SECRET as string),
    });
  }

  // when somethig comes to validate pasport use the settings defined on constructor
  // then validate the jwt, if is valid call validate
  // validate return whatever you want
  validate(payload: JwtPayload): { userId: string; email: string } | null {
    // payload is the content of the jwt
    // Ensure required fields exist before returning — keeps linters happy and is explicit
    if (
      !payload ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return { userId: payload.sub, email: payload.email };
  }
}
