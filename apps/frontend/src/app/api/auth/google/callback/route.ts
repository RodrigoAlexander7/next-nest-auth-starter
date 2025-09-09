import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { request } from 'https';
import { api } from '@/lib/apis';

// google returns to here with a token
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams; // interface to acces the content after the '?' in the URL
  const token = searchParams.get('token'); // acces to '?token=123' -> '123'

  if (!token) {
    return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
  }

  // Validate token with backend
  try {
    await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Token validation failed:', error);
    return NextResponse.redirect(new URL('/login?error=invalid_token', req.url));
  }

  // Token is valid, set cookie
  try {
    // we use await cause cookies is async on nextjs, in middleware not
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: 'access_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // to avoid CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/', // the cookie will be available in all the app
    });

    return NextResponse.redirect(new URL('/dashboard', req.url));
  } catch (error) {
    console.error('Error setting cookie:', error);
    return NextResponse.json(
      { message: 'Error setting cookie' },
      { status: 500 },
    );
  }
}
