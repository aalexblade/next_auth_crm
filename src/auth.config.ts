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
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin =
        isOnDashboard || nextUrl.pathname.startsWith('/companies');

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false;
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        // Redirect authenticated users to dashboard if they try to access login page
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
