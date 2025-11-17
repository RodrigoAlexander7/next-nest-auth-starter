import { Controller, Res, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';

import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth') // all the routes under 'auth'
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // Call auth/google and then redirect to the google strategy (defined on google.Strategy)
  // then the user is redirected to google login -> then is login we call the callback (defined on google.Strategy)
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
    return 'Google Auth';
  }

  // Passport change the auth code with a token
  // So we call auth/google/callback and then call -> callbackOauthGoogle
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthCallback(@Request() req, @Res() res) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    try {
      const { accessToken } = await this.authService.callbackOauthGoogle(
        // this req is the one modified by passport with the user info -> see comments in google.strategy.ts
        req.user,
      );

      // redirect to frontend with the token
      res.redirect(
        `${frontendUrl}/api/auth/google/callback?token=${accessToken}`,
      );
    } catch (error) {
      console.error('Error during Google auth callback:', error);
      res.redirect(`${frontendUrl}/auth/error?message=${error.message}`);
    }
  }
}
