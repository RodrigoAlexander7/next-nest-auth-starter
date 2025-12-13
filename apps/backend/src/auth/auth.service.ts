import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";
import type { User } from "@generated/prisma/client";
import * as bcrypt from "bcrypt";
import { RegisterDto, LoginDto } from "@/auth/dto";

interface GoogleProfile {
  name?: string;
  email?: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
}

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  // dependences injection
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Validates user credentials for local authentication
   * Returns user if credentials are valid, null otherwise
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Registers a new user with email and password
   * Throws ConflictException if email already exists
   */
  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password, name } = dto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    // Validate password strength (basic validation)
    if (password.length < 8) {
      throw new BadRequestException(
        "Password must be at least 8 characters long",
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const user = await this.usersService.createWithPassword({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    return this.generateToken(user);
  }

  /**
   * Authenticates user and returns JWT token
   * User validation is handled by LocalStrategy
   */
  async login(user: User): Promise<{ accessToken: string }> {
    return this.generateToken(user);
  }

  /**
   * Google OAuth callback handler
   * We don't use Google tokens; we create our own JWT
   */
  async callbackOauthGoogle(
    profile: GoogleProfile,
  ): Promise<{ accessToken: string }> {
    const { email, name, image } = profile;
    console.log("EMAIL RECIBIDO:", email);
    if (!email) throw new UnauthorizedException("Email not found from Google");

    let user: User | null = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        name,
        email,
        image,
      });
    }

    return this.generateToken(user);
  }

  /**
   * Generates JWT token for authenticated user
   * Private helper method to maintain DRY principle
   */
  private generateToken(user: User): { accessToken: string } {
    const payload = { sub: user.id, email: user.email };
    const jwt = this.jwtService.sign(payload);
    return { accessToken: jwt };
  }
}
