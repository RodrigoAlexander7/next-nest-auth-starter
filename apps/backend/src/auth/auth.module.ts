import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from '@/users/users.module';

@Module({
  providers: [AuthService, GoogleStrategy],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
