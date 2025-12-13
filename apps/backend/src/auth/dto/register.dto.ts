import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
    format: "email",
  })
  email: string;

  @ApiProperty({
    description: "User password (minimum 8 characters)",
    example: "securePassword123",
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: "User full name",
    example: "John Doe",
    required: false,
  })
  name?: string;
}
