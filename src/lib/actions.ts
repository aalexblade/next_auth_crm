'use server';

import { signIn, signOut } from '@auth';
import { revalidatePath } from 'next/cache';

const PROJECT_TOKEN = process.env.NEXT_PUBLIC_PROJECT_TOKEN;

export async function deleteCompany(id: string) {
  try {
    const res = await fetch(
      `https://${PROJECT_TOKEN}.mockapi.io/api/v1/companies/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete company');
    }

    revalidatePath('/companies');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

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
