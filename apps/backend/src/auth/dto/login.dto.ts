import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
    format: "email",
  })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "securePassword123",
  })
  password: string;
}
