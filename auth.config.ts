import type { NextAuthConfig } from 'next-auth';
import type { Session } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: Session | null;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/companies');

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
