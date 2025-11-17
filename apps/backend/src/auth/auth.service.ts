import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  // dependences injection
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  //we dont use access token nor refresh tken, we create our own jwt
  async callbackOauthGoogle({ name, email, image, accessToken, refreshToken }) {
    console.log('EMAIL RECIBIDO:', email);
    if (!email) throw new UnauthorizedException('Email not found from Google');

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        name,
        email,
        image,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const jwt = this.jwtService.sign(payload);
    return { accessToken: jwt }; // return an JWT object
  }
}
