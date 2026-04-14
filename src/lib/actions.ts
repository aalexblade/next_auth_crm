'use server';

import { auth, signIn, signOut } from '@auth';
import { revalidatePath } from 'next/cache';

const API_TOKEN = process.env.API_TOKEN;

export async function deleteCompany(id: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(
      `https://${API_TOKEN}.mockapi.io/api/v1/companies/${id}`,
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
