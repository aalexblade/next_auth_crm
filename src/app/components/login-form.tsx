'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/app/components/input-field';
import Button from '@/app/components/button';
import { authenticate } from '@/lib/actions';

export interface LoginFormProps {}

// Validation schema for the login form fields
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Submit handler uses server action to authenticate user credentials
  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await authenticate({
        email: values.email,
        password: values.password,
      });

      if (result.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your credentials to continue to the dashboard.
        </p>
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Test login credentials</p>
          <div className="mt-2 space-y-2">
            <div>
              <p className="font-semibold text-green-700">✅ Success:</p>
              <p>
                Email: <span className="font-semibold">test@example.com</span>
              </p>
              <p>
                Password: <span className="font-semibold">password123</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <Formik
        initialValues={{
          email: 'test@example.com',
          password: 'password123',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <InputField
                type="email"
                name="email"
                id="email"
                label="Email"
                placeholder="your@email.com"
                disabled={isLoading || isSubmitting}
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="••••••"
                disabled={isLoading || isSubmitting}
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              {isLoading || isSubmitting ? 'Loading...' : 'Sign In'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
