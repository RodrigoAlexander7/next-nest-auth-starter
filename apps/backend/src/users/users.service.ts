import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import type { User } from "@generated/prisma/client";

export interface CreateUserDto {
  name?: string | null;
  email: string;
  image?: string | null;
}

export interface CreateUserWithPasswordDto {
  name?: string | null;
  email: string;
  password: string;
  image?: string | null;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user (for OAuth providers like Google)
   * Password is optional for OAuth users
   */
  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.client.user.create({
      data: {
        name: data.name ?? null,
        email: data.email,
        image: data.image ?? null,
      },
    });
  }

  /**
   * Creates a new user with password (for local authentication)
   */
  async createWithPassword(data: CreateUserWithPasswordDto): Promise<User> {
    return this.prisma.client.user.create({
      data: {
        name: data.name ?? null,
        email: data.email,
        password: data.password,
        image: data.image ?? null,
      },
    });
  }

  /**
   * Finds a user by email
   * Returns null if user doesn't exist
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { email },
    });
  }

  /**
   * Finds a user by ID
   * Returns null if user doesn't exist
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }
}
