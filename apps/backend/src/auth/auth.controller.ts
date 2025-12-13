import {
  Controller,
  Res,
  Req,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { RegisterDto, LoginDto } from "@/auth/dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import type { User } from "@generated/prisma/client";

interface GoogleProfile {
  name?: string;
  email?: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
}

@ApiTags("auth")
@Controller("auth") // all the routes under 'auth'
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * POST /auth/register
   * Registers a new user with email and password
   */
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user with email and password" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "user@example.com",
        },
        password: {
          type: "string",
          minLength: 8,
          example: "securePassword123",
        },
        name: {
          type: "string",
          example: "John Doe",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: "Email already registered",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input or password too short",
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /auth/login
   * Authenticates user with email and password
   * Uses LocalStrategy to validate credentials
   */
  @UseGuards(AuthGuard("local"))
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "user@example.com",
        },
        password: {
          type: "string",
          example: "securePassword123",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "User successfully authenticated",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  async login(@Req() req: ExpressRequest & { user?: User }) {
    // User is attached to req by LocalStrategy after successful validation
    return this.authService.login(req.user!);
  }

  // ========== Google OAuth Routes ==========

  // Call auth/google and then redirect to the google strategy (defined on google.Strategy)
  // then the user is redirected to google login -> then is login we call the callback (defined on google.Strategy)
  @UseGuards(AuthGuard("google"))
  @Get("google")
  googleAuth() {
    return "Google Auth";
  }

  // Passport change the auth code with a token
  // So we call auth/google/callback and then call -> callbackOauthGoogle
  // here we use the guard that we register on passport (see jwt.strategy.ts)
  @UseGuards(AuthGuard("google"))
  @Get("google/callback")
  async googleAuthCallback(
    //req is comming from passport -> see google.strategy
    //this req is the one midified by passpor with the user info -> see google strategy.ts
    @Req() req: ExpressRequest & { user?: GoogleProfile },
    @Res() res: ExpressResponse,
  ) {
    const frontendUrl = this.configService.get<string>("frontendURL");

    try {
      const { accessToken } = await this.authService.callbackOauthGoogle(
        req.user ?? {},
      );

      // redirect to frontend with the token
      res.redirect(
        `${frontendUrl}/api/auth/google/callback?token=${accessToken}`,
      );
    } catch (error: any) {
      console.error("Error during Google auth callback:", error);
      res.redirect(
        `${frontendUrl}/auth/error?message=${error?.message ?? "unknown"}`,
      );
    }
  }
}
