# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 5173 (exposed to local network)
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test suite is configured. There is no single-test runner command.

## Architecture Overview

This is a **dual-site React/TypeScript app** — a public college website and a private admin CMS — sharing one codebase and Vite build.

**Tech stack:** React 19, TypeScript, Vite, TailwindCSS v4 (via `@tailwindcss/vite` plugin), TanStack Query v5, React Router v7, Axios, Tiptap (rich text editor), Framer Motion.

**Deployed to Netlify** with a single redirect rule (`/* → /index.html`).

### Two apps, one router

`src/routes/routes.tsx` merges two route trees:

| Route prefix | Source file | Layout | Auth |
|---|---|---|---|
| `/` | `WebsiteRoutes.tsx` | `WebsiteLayout` (NavBar + Footer + Chatbot) | Public |
| `/admin/auth` | `AdminRoutes.tsx` | None (login page) | Public |
| `/app/*` | `AdminRoutes.tsx` | `AppLayout` (Sidebar + Header) | Protected |

Website pages are **lazy-loaded** (`React.lazy`). Admin pages are eagerly imported.

### Auth & permissions

- `useMe` hook (`src/login/hooks/useMe.tsx`) fetches `/auth/me` via React Query — the result is the session source of truth.
- JWT token is stored in `localStorage` under `"token"` and attached to every request via an Axios request interceptor.
- `ProtectedRoute` in `AdminRoutes.tsx` checks `meData.data.permissions` against `routePermissions` — a map of admin route paths to `PermissionNameType` values. Unauthorized routes render `<NotFoundPage />`.
- Roles: `SUPERADMIN | ADMIN | USER | MANAGER`. Fine-grained access is controlled by `PermissionNameType` (defined in `src/login/model/permission.ts`).

### API layer

`src/services/apiClient.ts` exports a generic `APIClient<T>` class. Instantiate it with an endpoint string to get typed CRUD methods:

```ts
const api = new APIClient<MyType>("/my-endpoint");
api.getAll()       // GET /my-endpoint
api.get(id)        // GET /my-endpoint/:id
api.post(data)     // POST /my-endpoint
api.put(data, id)  // PUT /my-endpoint/:id
api.delete(id)     // DELETE /my-endpoint/:id
api.postFile(fd)   // POST multipart/form-data
api.putFile(fd, id)// PUT multipart/form-data
api.postImage(fd)  // PUT multipart/form-data (alias for image updates)
```

Response shape is always `ApiResponse<T>` (`src/services/apiTypes.ts`): `{ statusCode, data, message, success, pagination? }`.

Errors are normalized by the response interceptor into `ApiErrorResponse` before being thrown.

### Constants and cache keys

All API URLs and React Query cache keys live in `src/constants.tsx`. The production API base is `https://lbef-server.lbef.org/api`; the localhost alternative is commented out there.

### Global state (Context API)

`ContextApp` (`src/context/ContextApp.tsx`) provides:
- `showToast(message, type)` — wraps react-toastify
- `theme` / `toggleTheme` — light/dark, persisted to `localStorage`
- `isOnline` — network status
- `userPermissions` / `setUserPermissions`

`EnquiryProvider` (`src/context/EnquiryContext.tsx`) exposes `useEnquiry().open()` to trigger the Meritto enquiry widget.

React Query (`QueryClient`) is configured in `src/main.tsx` with `staleTime: 20s`, `gcTime: 5min`, `refetchInterval: 90s`, and `refetchOnWindowFocus/Reconnect/Mount: false`.

### Admin page pattern

Admin CRUD modules follow a consistent structure using `LayoutTemplate` (`src/template/ModuleTemplete.tsx`):
- Table view / card view toggle
- Add button that opens a modal
- `LayoutColumnConfig<T>` for column definitions

Reusable components for admin pages: `src/components/table/TableComponent.tsx`, `src/utils/Pagination.tsx`, `src/utils/InputField.tsx`, `src/utils/ImageCompression.tsx`.

### Directory map

```
src/
  routes/          # Route definitions (AdminRoutes, WebsiteRoutes)
  context/         # ContextApp (global), EnquiryContext
  services/        # APIClient, ApiTypes
  constants.tsx    # BASE_URL, cache keys
  login/           # Auth hooks (useMe, useLogin, useLogout), FrontendUser model, LoginPage
  pages/           # Admin CMS pages (one folder per module)
  website/         # Public-facing pages and WebsiteLayout
  components/      # Shared UI: layout (AppLayout, SideBar, Header), table, hooks
  template/        # ModuleTemplete (admin page scaffold), TempleteTypes
  utils/           # Pagination, InputField, ImageCompression, ParseDate, bs-converter
```
