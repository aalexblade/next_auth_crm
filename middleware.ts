import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Захищаємо всі роути, крім статики та API
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
