import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  // Imports are allways modules, not services
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      global: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  // Services by the module it self (no from other module)
  providers: [AppService],
})
export class AppModule {}
