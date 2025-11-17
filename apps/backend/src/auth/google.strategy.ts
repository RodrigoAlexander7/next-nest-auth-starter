import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '@/auth/auth.service';
import { Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  //  |->  PassportStrategy: Nest wrapper that to implement Passport strategies
  //       Strategy: Passport class and "Define cómo se conecta con Google, cómo intercambia tokens, etc.
  //       so we extends from Strategy and register with the 'google' name
  //       and our class implement the validate method
  //  ->  So when we call @UseGuards(AuthGuard('google'))
  //      - Nest call the strategy with 'google's' name(our class) and use it

  constructor(
    private readonly authService: AuthService, // inject the service (AuthService) as dependencie
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('AUTH_GOOGLE_ID')!,
      clientSecret: configService.get<string>('AUTH_GOOGLE_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }
  // THIS'S SO IMPORTANT
  // that we return here -> is that Passport store on req.user
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Profile object contains so much (and unnecesary) information so just incluthe that we want
    const { id, displayName, emails, photos } = profile;

    const user = {
      name: displayName,
      email: emails?.[0]?.value,
      image: photos?.[0]?.value,
      accessToken,
      refreshToken,
    };

    return user;
  }
}
