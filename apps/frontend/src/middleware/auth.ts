import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { protectedRoutes, authRoutes } from '@/config/protectedRoutes';

/* 
req contains:
   - req.cookies -> acces to cookies
   - req.nextUrl -> the url that call --- if is 'localhost:3000/dashboard' will be 'dashboard'
      |-> URL de la solicitud, con métodos útiles como pathname, searchParams, etc.
   - req.headers -> the headers HTTP 
   - req.ip      -> the ip of the client (if it has one)
*/
export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuth = authRoutes.some((auth) => pathname.startsWith(auth));

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
