Berikut **Starter Project Bootcamp IT** versi production-ready menggunakan:

- ⚛️ ReactJS + Vite + TypeScript
- 🎨 TailwindCSS
- 🧠 Zustand (state management)
- 🌐 Axios (API client)
- 🛣 React Router
- 📦 TanStack React Query (data fetching caching)
- 📝 React Hook Form + Zod (validasi form)
- 🔔 React Hot Toast (notification)
- 🎯 Lucide Icons
- 🧹 ESLint + Prettier

Struktur ini cocok untuk:

- Admin panel
- Dashboard internal
- Aplikasi bootcamp / LMS
- Aplikasi UMKM / layanan publik

---

# 🚀 1️⃣ Create Project

```bash
npm create vite@latest bootcamp-it
cd bootcamp-it
npm install
```

Pilih:

```
React
TypeScript
```

---

# 📦 2️⃣ Install Dependencies

### Core

```bash
npm install react-router-dom axios zustand
```

### Data Fetching

```bash
npm install @tanstack/react-query
```

### Form & Validation

```bash
npm install react-hook-form zod @hookform/resolvers
```

### UI Support

```bash
npm install react-hot-toast lucide-react clsx
```

### Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

# 🎨 3️⃣ Tailwind Setup

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-800;
}
```

---

# 📁 4️⃣ Folder Structure (Clean Architecture)

```
src/
│
├── app/
│   ├── store/
│   │   └── auth.store.ts
│   └── queryClient.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│
├── features/
│   └── auth/
│       ├── LoginPage.tsx
│       ├── auth.service.ts
│       └── auth.schema.ts
│
├── lib/
│   └── axios.ts
│
├── routes/
│   └── AppRouter.tsx
│
├── types/
│
├── App.tsx
└── main.tsx
```

---

Layout Admin Dashboard menggunakan konsep outline

# 🧠 5️⃣ Zustand Auth Store

### `auth.store.ts`

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "auth-storage" },
  ),
);
```

---

# 🌐 6️⃣ Axios Instance

### `lib/axios.ts`

```ts
import axios from "axios";
import { useAuthStore } from "@/app/store/auth.store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

# 🔥 7️⃣ React Query Setup

### `queryClient.ts`

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
```

### `main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

---

# 📝 8️⃣ Login Form (React Hook Form + Zod)

### `auth.schema.ts`

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginForm = z.infer<typeof loginSchema>;
```

---

# 🛣 9️⃣ Router Setup

### `AppRouter.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

# 🔔 Toast Setup

### `App.tsx`

```tsx
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
    </>
  );
}
```

---

# 🧹 10️⃣ Optional Dev Tools (Recommended)

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks
```

---

# 📌 .env Example

```
VITE_API_URL=http://localhost:8080/api
```

---

# 🏗 Production Upgrade (Opsional Tambahan)

Jika ingin lebih advanced:

- shadcn/ui
- Framer Motion
- TanStack Table
- React Query Devtools
- Husky + lint-staged
- Vitest + React Testing Library

---

# 🎯 Final Result

Dengan starter ini kamu sudah punya:

✅ Clean folder structure
✅ Global state
✅ API client
✅ Auth ready
✅ Form validation
✅ Toast notification
✅ Routing
✅ Production-ready pattern
