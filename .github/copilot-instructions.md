---
name: Next.js CRM Development Guidelines
description: 'Core conventions for Next.js 14 CRM: App Router with parallel routes, TypeScript-first, React Query + Formik patterns, component boundaries, and NextAuth guard rails.'
---

# Next.js CRM Development Guidelines

This workspace is a **Next.js 14 CRM** with advanced routing (parallel routes, interception), client/server component boundaries, form management via Formik, data fetching via React Query, and authentication via NextAuth. The guidelines below ensure consistency across the codebase.

## Quick Commands

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build
pnpm start    # Run built app
pnpm lint     # ESLint + Next.js rules
```

## Core Architecture

### 1. Routing & Layouts

**Structure**

- **App Router (Next.js 13+)** with `src/app/` directory
- **Route groups** using `(groupName)` folder notation for logical organization without affecting URL
  - `(admin)` group: protected authenticated routes
  - Dashboard and Companies pages use **parallel routes** with `@slotName/` directories
- **Interception routes** using `(.)` prefix for soft navigation (e.g., modal interception)
- **Dynamic segments** using `[id]` and catching 404s with `not-found.tsx`

**Key Setup**

- Root `layout.tsx`: Wraps entire app with `Providers` (React Query, DevTools)
- Admin `(admin)/layout.tsx`: Sidebar layout with `ml-60` spacing, conditional rendering of children and parallel slots
- Dashboard uses independent `@stats`, `@sales`, `@categories`, `@countries`, `@promotions` _parallel slots_; all rendered independently with error boundaries

### 2. Component Patterns & Client Boundaries

**Client vs. Server**

- **Server Components** (default): Metadata, static layouts, API calls
- **Client Components** (`'use client'`): State, event handlers, hooks — use at component boundaries, not entire tree

**Patterns**

- **Container → Form Component**: Modals wrap forms internally
  - `CompanyFormModal.tsx` (client) → renders `Modal` + `CompanyForm`
  - `CompanyForm.tsx` uses `<Formik>` for state and validation
- **Reusable Primitives**: Button, InputField, StatusLabel, Modal — compose with props
- **Props Interface First**: Export `{ComponentName}Props` interface; document required/optional fields

**Naming**

- Components: PascalCase (e.g., `CompanyForm.tsx`, `AddCompanyButton.tsx`)
- Hooks/utilities: camelCase (e.g., `getCountById.ts`, `getQueryClient.ts`)
- File type suffixes: `-form`, `-modal`, `-table`, `-button`, `-card`, `-label`, `-input` for clarity

**UI Library: Headless UI**

- Use `@headlessui/react` for Dialog, Transition (not custom modals)
- Styled with Tailwind utilities (no CSS Modules or inline styles)
- Conditional classes via `clsx()` for state-based styling

### 3. API & Data Layer

**File**: `src/lib/api.ts`

**Data Models** (TypeScript interfaces)

```typescript
- Company (id, name, status, image, ...)
- Promotion (id, company_id, title, discount, ...)
- Category, Country, SummaryStats
- Enums: CompanyStatus = 'Active' | 'NotActive' | 'Pending' | 'Suspended'
```

**API Functions**

- Generic `sendRequest<T>(path, options)`: handles fetch + JSON parsing + error handling
- Query functions: `getCompanies()`, `getCategories()`, `getCountries()`, `getPromotions()`, `getSummaryStats()`
- Return type: `Promise<T>` (explicit generic)

**React Query Integration**

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['companies'], // Unique cache key
  queryFn: () => getCompanies(),
  staleTime: 10 * 1000, // 10 seconds
});
```

- Always use explicit `queryKey` and `queryFn`
- Query keys follow pattern: `[entityName]`, `[entityName, id]`, `[entityName, filter]`
- Cache stale time: 10 seconds by default

### 4. Authentication & Guard Rails

**Files**: `auth.ts`, `auth.config.ts`, `middleware.ts`, `src/lib/actions.ts`

**NextAuth v5 Beta Setup**

- **Provider**: Credentials (placeholder; expand as needed)
- **Sign-in page**: `/login` (custom form in `src/app/login/page.tsx`)
- **Protected routes**: `/dashboard`, `/companies`, `/companies/*` enforced via `authorized` callback
- **Middleware**: Validates session for all routes except static assets and API

**Flow**

1. User submits login form → calls server action `authenticate()` in `src/lib/actions.ts`
2. Server action calls `signIn('credentials', formData)` via NextAuth
3. Middleware checks session; redirects unauthenticated requests to `/login`
4. Callbacks enforce: logged-in users cannot access `/login`

**When Adding Auth Features**

- Server actions go in `src/lib/actions.ts` (sign-in, sign-out, mutations with auth checks)
- Session accessed via `auth()` function (server-side only via NextAuth import)
- Middleware patterns: `matcher` array in `middleware.ts` for route-level protection

### 5. Forms & Validation

**Tool**: Formik v2 + custom InputField component

**Pattern**

```typescript
<Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={yupSchema}
  onSubmit={async (values) => { /* call server action */ }}
>
  {({ values, errors, touched, setFieldValue }) => (
    <Form>
      <InputField name="name" label="Name" {...fieldProps} />
      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>
```

- `InputField` component: wraps label + input + error message, styled with Tailwind
- Validation: via Yup schema (passed to Formik)
- Server actions or API calls in `onSubmit` handler

### 6. Styling

**Framework**: Tailwind CSS v3 (utility-first)

**No CSS Modules or inline styles**; use Tailwind classes directly.

**Patterns**

- Flexbox: `flex`, `flex-col`, `gap-4`
- Grid: `grid`, `grid-cols-12`, `col-span-6` for responsive layouts
- Spacing: `p-4`, `m-2`, `gap-3` (use Tailwind scale)
- Responsive: `md:col-span-6`, `lg:flex-row`
- State styles: use `clsx()` for conditional classes
  - Example: `clsx('px-4 py-2', { 'bg-blue-500': isActive, 'bg-gray-300': !isActive })`

**Color Palette**: Tailwind defaults (blue, gray, green, red for statuses and buttons)

### 7. Type Safety

**TypeScript Strict Mode**

- All components export `{ComponentName}Props` interface
- React Query queries return typed promises: `Promise<Company[]>`
- NextAuth session typed via `Session` interface (check `auth.config.ts`)
- API endpoints return typed responses: `sendRequest<Company>(...)`

**Naming Enums for Clarity**

- `CompanyStatus`, `PromotionStatus` (not magic strings)
- Referenced in filtering, status badges, form dropdowns

## Common Development Tasks

### Adding a New Entity (e.g., User Management)

1. **Define type** in `src/lib/api.ts`:

   ```typescript
   export interface User {
     id: string;
     email: string;
     role: 'admin' | 'user';
   }
   ```

2. **Add API function** in `src/lib/api.ts`:

   ```typescript
   export const getUsers = () => sendRequest<User[]>('users');
   ```

3. **Build page/component** in `src/app/(admin)/users/`:
   - Layout: `src/app/(admin)/users/layout.tsx` (optional)
   - List page: `src/app/(admin)/users/page.tsx` (use `useQuery`)
   - Detail page: `src/app/(admin)/users/[id]/page.tsx`
   - Form component: `src/app/components/user-form.tsx` (Formik + InputField)

4. **Add modal route** (optional):
   - Create `src/app/(admin)/users/@modal/(.)new/page.tsx` for interception
   - Renders `UserFormModal` on top of list

### Fetching Data in a Component

```typescript
'use client'
import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '@/lib/api'

export function CompanyList() {
  const { data, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  if (isLoading) return <div>Loading...</div>
  return <div>{/* render data */}</div>
}
```

### Handling Server Actions & Mutations

```typescript
// src/lib/actions.ts
'use server';

export async function deleteCompany(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await sendRequest(`companies/${id}`, { method: 'DELETE' });
}

// In component:
const handleDelete = async (id: string) => {
  await deleteCompany(id);
  queryClient.invalidateQueries({ queryKey: ['companies'] });
};
```

### Creating a Modal Trigger

1. Add route: `src/app/(admin)/companies/@modal/(.)new/page.tsx`
2. Soft navigation: `<Link href="?new">Open Form</Link>` (appends query param)
3. Render modal: `<CompanyFormModal />`
4. Close: dismiss via Modal component's `onClose` prop, which resets URL

## Anti-Patterns to Avoid

- ❌ **Inline styles or custom CSS** — Use Tailwind only
- ❌ **Fetching in server actions without type safety** — Always wrap in interface
- ❌ **Multiple `'use client'` boundaries in one tree** — Use sparingly at leaf components only
- ❌ **Direct fetch() instead of `sendRequest()`** — No error handling or reusability
- ❌ **Bypassing Formik validation** — All form inputs should validate before submit
- ❌ **Static `queryKey` strings** — Use constant arrays for consistency and easy filtering
- ❌ **No error boundaries** — Dashboard and nested routes should have `error.tsx` files

## Documentation & Learning

- **[Next.js 14 App Router](https://nextjs.org/docs/app)** — Route groups, parallel routes, layouts
- **[NextAuth.js v5](https://authjs.dev/getting-started/installation?framework=nextjs)** — v5 beta docs
- **[React Query v5](https://tanstack.com/query/latest)** — Data fetching, caching
- **[Formik Documentation](https://formik.org/)** — Form state & validation
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Utility classes, responsive design
- **[Headless UI](https://headlessui.com/)** — Unstyled, accessible components

## Next Steps for Customization

Once familiar with these guidelines, consider creating:

- **File instructions** (`.github/instructions/*.instructions.md`) for specific directories (e.g., `src/app/components/*.instructions.md` for component guidelines)
- **Prompts** (`.github/prompts/*.prompt.md`) for common tasks (e.g., "create a new entity")
- **Hooks** (`.github/hooks/*.json`) for auto-formatting or linting on commit
