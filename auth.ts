import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

const TEST_USER = {
  id: '1',
  name: 'Demo User',
  email: 'test@example.com',
};

const TEST_PASSWORD = 'password123';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Only accept the test user credentials
        if (
          credentials?.email === TEST_USER.email &&
          credentials?.password === TEST_PASSWORD
        ) {
          return TEST_USER;
        }

        // Return null for invalid credentials (this will cause signIn to throw an error)
        return null;
      },
    }),
  ],
});
