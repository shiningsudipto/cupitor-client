# Cupitor Client - Project Setup Summary

## ✅ Completed Setup

### 📁 Project Structure

The project follows a **role-based routing structure**:

```
app/
├── (public)/              # Public routes
│   ├── page.tsx          # Homepage
│   ├── jobs/             # Job listings
│   ├── companies/        # Company listings
│   ├── login/            # Login page
│   └── register/         # Registration page
│
├── candidate/            # Candidate dashboard
│   ├── dashboard/
│   ├── profile/
│   └── applications/
│
├── company/              # Employer dashboard
│   ├── dashboard/
│   ├── jobs/
│   └── applicants/
│
└── admin/                # Admin panel
    ├── login/
    └── dashboard/
```

### 🗄️ State Management (Zustand)

**Location**: `store/useAuthStore.ts`

**Features**:

- User authentication state
- Token management
- Persistent storage with localStorage
- Type-safe with TypeScript

**Usage**:

```typescript
import { useAuthStore } from "@/store/useAuthStore";

const { user, login, logout } = useAuthStore();
```

### 📝 Form Validation (Zod Schemas)

**Location**: `schemas/`

**Available Schemas**:

- `auth.schema.ts` - Login & Registration
- `user.schema.ts` - Profile & Password
- `job.schema.ts` - Job Posting & Applications

**Usage**:

```typescript
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});
```

### 🔌 API Integration (Server Actions)

**Location**: `app/actions/`

**Available Actions**:

- `auth.ts` - Authentication
- `admin.ts` - Admin operations
- `candidate.ts` - Candidate operations
- `company.ts` - Company operations
- `job.ts` - Job operations
- `application.ts` - Application operations

**Usage**:

```typescript
import { loginUser } from "@/app/actions/auth";

const result = await loginUser({ email, password });
```

### 🧩 Custom Components

**Location**: `components/`

**Available Components**:

1. **CustomModal** - Modal/Dialog component
2. **CustomPopover** - Popover/Dropdown component
3. **CustomTable** - Advanced data table with:
   - Search
   - Filtering
   - Sorting
   - Selection
   - CSV Export

**Usage**:

```typescript
import { CustomModal } from "@/components/CustomModal";
import { CustomPopover } from "@/components/CustomPopover";
import { CustomTable } from "@/components/CustomTable";
```

### 🎨 UI Components (shadcn/ui)

**Location**: `components/ui/`

**Available Components**:

- Button, Input, Card, Dialog
- Popover, Table, Checkbox
- Select, Tabs, Separator
- Avatar, Label, Slider
- Progress, Switch, and more

### 📦 Installed Dependencies

**Core**:

- Next.js 15.5.6
- React 19.1.0
- TypeScript 5

**Forms & Validation**:

- react-hook-form ^7.69.0
- zod ^4.2.1
- @hookform/resolvers ^5.2.2

**State Management**:

- zustand ^5.0.9

**UI & Styling**:

- Tailwind CSS 4
- shadcn/ui components
- lucide-react (icons)
- sonner (toast notifications)

**Utilities**:

- js-cookie ^3.0.5
- clsx, tailwind-merge

## 🚀 Quick Start Guide

### 1. Development Server

```bash
npm run dev
```

### 2. Creating a New Form

```typescript
// 1. Create schema in schemas/
export const myFormSchema = z.object({
  field: z.string().min(1, "Required"),
});

export type MyFormValues = z.infer<typeof myFormSchema>;

// 2. Use in component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm<MyFormValues>({
  resolver: zodResolver(myFormSchema),
});
```

### 3. Creating a Server Action

```typescript
// app/actions/myAction.ts
"use server";

import { fetchWithAuth } from "./shared";

export async function myAction(data: any) {
  return await fetchWithAuth("/endpoint", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

### 4. Using Zustand Store

```typescript
// Create store in store/
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMyStore = create(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    { name: "my-storage" }
  )
);
```

## 📋 Development Checklist

When creating new features:

- [ ] Routes organized by role
- [ ] Forms use React Hook Form + Zod schemas
- [ ] Schemas defined in `/schemas`
- [ ] API calls use Server Actions
- [ ] Global state uses Zustand
- [ ] Custom components used (Modal, Popover, Table)
- [ ] UI components from shadcn/ui
- [ ] TypeScript types defined
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Toast notifications for feedback
- [ ] Responsive design
- [ ] Follow color scheme from COLOR_SCHEME.md

## 🎯 Key Conventions

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Server Actions: `camelCase.ts`
- Stores: `useCamelCase.ts`
- Schemas: `camelCase.schema.ts`

### Import Order

1. React imports
2. Third-party libraries
3. Components
4. Utils/helpers
5. Types

### Code Style

- Use TypeScript for all files
- Define interfaces for all data structures
- Avoid `any` type
- Use proper error handling
- Add loading states
- Use toast notifications for user feedback

## 📚 Documentation

- **Instructions**: `instructions.md`
- **Color Scheme**: `COLOR_SCHEME.md`
- **Schemas**: `schemas/README.md`
- **Admin Setup**: `cupitor-server/examples/ADMIN_SETUP.md`

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Last Updated**: December 24, 2025

**Status**: ✅ Ready for Development
