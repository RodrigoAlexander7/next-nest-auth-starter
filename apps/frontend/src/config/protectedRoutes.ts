export const protectedRoutes = ['/dashboard', '/settings'];
export const authRoutes = ['/login', '/register'];

const matcher = [...protectedRoutes.map((r) => `${r}/:path*`), ...authRoutes];

export const routesConfig = {
  matcher,
};
