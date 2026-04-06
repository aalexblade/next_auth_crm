import type { Metadata } from 'next';
import LoginForm from '@/app/components/login-form';

export const metadata: Metadata = {
  title: 'CRM Login | Secure Admin Dashboard',
  description:
    'Sign in to your CRM admin dashboard to manage companies, promotions, and sales data securely.',
  keywords: [
    'CRM login',
    'admin dashboard',
    'companies',
    'promotions',
    'sales management',
    'secure login',
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-3xl bg-white p-8 shadow-2xl md:p-12 lg:flex-row lg:items-center">
        <section className="space-y-6 lg:max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Welcome to CRM
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Sign in and continue managing your companies
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Access the secure CRM admin portal to manage company profiles,
            promotions, and sales analytics. Use the form on the right to sign
            in and keep your business data up to date.
          </p>
        </section>

        <section className="w-full lg:w-[420px]">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
