# Login Form Implementation Notes

## Files

- `src/app/components/login-form.tsx`
- `auth.ts`
- `src/lib/actions.ts`

## What changed

- Added a custom login form component using **Formik** for form state management.
- Added **Yup** validation schema for email and password fields.
- Provided a built-in demo user credential preview in the login form UI.
- Added a redirect to `/dashboard` after successful login using `router.push('/dashboard')`.
- Added UI enhancements for a more modern login card appearance.

## Form details

- The form is built as a **client component** with `'use client'`.
- It uses `InputField` and `Button` reusable components.
- Validation errors are rendered directly under the inputs.
- The submit button displays `Loading...` while authentication is in progress.
- The form is prefilled with demo credentials:
  - Email: `test@example.com`
  - Password: `password123`

## Authentication flow

- `src/lib/actions.ts` exports `authenticate(formData)`.
- `authenticate` calls `signIn('credentials', formData)` from NextAuth.
- `auth.ts` defines the `Credentials` provider and authorizes only the demo credentials.
- When authentication succeeds, the user is redirected to `/dashboard`.

## Notes

- If you want to change the demo credentials, update both `auth.ts` and `login-form.tsx`.
- The current `auth.config.ts` already protects admin routes via `authorized` callback logic.
- The login form is rendered on the homepage and on `/login`.
