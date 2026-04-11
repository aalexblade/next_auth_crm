'use server';
import { signIn, signOut } from '@auth';

export async function authenticate(credentials: {
  email: string;
  password: string;
}) {
  const redirectUrl = await signIn('credentials', {
    ...credentials,
    redirect: false,
    redirectTo: '/dashboard',
  });

  if (typeof redirectUrl !== 'string') {
    throw new Error('Authentication failed. Please check your credentials.');
  }

  const parsedUrl = new URL(redirectUrl, 'http://localhost');
  if (parsedUrl.searchParams.get('error')) {
    throw new Error('Authentication failed. Please check your credentials.');
  }

  return { ok: true };
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}
