'use server';

import { auth, signIn, signOut } from '@auth';
import { revalidatePath } from 'next/cache';
import * as api from '@/lib/api';

export async function fetchCountries() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getCountries();
}

export async function fetchCategories() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getCategories();
}

export async function fetchCompanies(params: any) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getCompanies(params);
}

export async function fetchPromotions(params: any) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getPromotions(params);
}

export async function fetchSummaryStats() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getSummaryStats();
}

export async function fetchSummarySales() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getSummarySales();
}

export async function fetchCompany(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  return api.getCompany(id);
}

export async function createNewPromotion(data: Omit<api.Promotion, 'id'>) {
  try {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    await api.createPromotion(data);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function createNewCompany(
  data: Omit<api.Company, 'id' | 'hasPromotions'>,
) {
  try {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    await api.createCompany(data);
    revalidatePath('/companies');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteCompany(id: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(
      `https://${process.env.API_TOKEN}.mockapi.io/api/v1/companies/${id}`,
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
