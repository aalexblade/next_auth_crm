This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Overview

This repository is a small CRM-style admin dashboard built with the latest **Next.js App Router** and **TypeScript**. It includes a custom login experience, protected admin pages, and several UI utilities to manage companies, promotions, and dashboard summaries.

The login flow is implemented using **NextAuth v5 beta** with a credentials provider and demo credentials, and a successful login redirects the user to `/dashboard`.

## Tech Stack

- **Next.js 15** - Utilizing the latest App Router features
- **TypeScript 5** - For type-safe development and improved developer experience
- **React 18** - Modern UI development with concurrent features
- **Tailwind CSS 3** - Utility-first CSS framework for rapid and consistent styling
- **NextAuth.js v5 (Beta)** - Flexible and secure authentication with session management
- **TanStack Query (React Query) v5** - Advanced data fetching, caching, and state synchronization
- **Formik 2 + Yup 1** - Robust form handling with schema-based validation
- **Headless UI 1** - Completely unstyled, fully accessible UI primitives
- **clsx 2** - Lightweight utility for constructing conditional `className` strings
- **MockAPI.io** - RESTful backend simulation for development and testing

## Architecture

This project follows a modern, scalable architecture leveraging the full capabilities of the **Next.js App Router**:

- **App Router & Layouts:** Hierarchical layout system for shared UI components across different segments of the application.
- **Parallel & Intercepting Routes:** Extensive use of Parallel Routes (`@modal`, `@header`, `@toolbar`) and Intercepting Routes (`(.)new`) to create complex, modal-driven interfaces that preserve browser history and state.
- **Route Groups:** Organized administrative sections under the `(admin)` group to manage shared layouts and middleware logic cleanly.
- **Hybrid Component Model:** Strategic use of **Server Components** for data fetching and performance, combined with **Client Components** for rich interactivity and local state management.
- **Edge-Ready Authentication:** Route protection implemented at the edge using `middleware.ts` and NextAuth.js for low-latency security checks.
- **Typed API Layer:** Centralized, type-safe data fetching utilities in `src/lib/api.ts` designed to work seamlessly with TanStack Query.
- **Declarative Form Management:** Centralized form logic using Formik, ensuring consistent validation and submission patterns across the CRM.

## Project Structure

- `src/app/` — application routes and layouts
- `src/app/components/` — reusable UI components
- `src/lib/` — authentication actions and API utilities
- `auth.ts` / `auth.config.ts` — NextAuth configuration
- `middleware.ts` — route protection logic

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Login Form Documentation

Implementation details for the custom login form are available in [`doc/login-form.md`](doc/login-form.md).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
