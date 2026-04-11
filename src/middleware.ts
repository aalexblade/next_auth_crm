import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Apply middleware to all routes except static assets and specific files
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
