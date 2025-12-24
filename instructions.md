# Cupitor Frontend Development Guidelines

## 🎨 Design System

### Colors

- Follow the color scheme defined in `COLOR_SCHEME.md`
- Use CSS variables from `app/globals.css` for theming
- Primary: `#21f3be` (Mint/Turquoise)
- Secondary: `#af9aff` (Purple/Lavender)
- Accent: `#ff9356` (Orange/Coral)

### UI Components

Always use components from `@/components/ui` (shadcn/ui):

- Button, Input, Card, Dialog, Popover, Table, etc.
- Maintain consistent styling across the application

---

## 📁 Project Structure & Routing

### Route Organization by Role

Routes are organized by user role for better maintainability and access control:

```
app/
├── (public)/              # Public routes (no auth required)
│   ├── page.tsx          # Homepage
│   ├── jobs/             # Job listings
│   ├── companies/        # Company listings
│   ├── login/            # Login page
│   └── register/         # Registration page
│
├── candidate/            # Candidate dashboard routes
│   ├── dashboard/        # Candidate dashboard
│   ├── profile/          # Profile management
│   ├── applications/     # Job applications
│   └── saved-jobs/       # Saved jobs
│
├── company/              # Employer/Company routes
│   ├── dashboard/        # Company dashboard
│   ├── jobs/             # Job management
│   ├── applicants/       # Applicant management
│   └── profile/          # Company profile
│
└── admin/                # Admin panel routes
    ├── login/            # Admin login
    ├── dashboard/        # Admin dashboard
    ├── users/            # User management
    └── settings/         # System settings
```

### Routing Best Practices

1. **Group by Role**: Keep all routes for a specific role in their respective folder
2. **Route Groups**: Use `(groupName)` for layout grouping without affecting URL
3. **Protected Routes**: Implement auth checks in layout files for each role
4. **Nested Routes**: Use folder structure to represent URL hierarchy

---

## 📝 Forms & Validation

### React Hook Form (Required)

**ALWAYS use React Hook Form for all forms in the application.**

#### Form Validation Rules

- Use Zod for schema validation
- Define schemas at /schemas
- Include helpful error messages
- Validate on submit and on blur for better UX

---

## 🔌 API Integration

### Server Actions (Required)

**ALWAYS use Next.js Server Actions for API calls.**

#### Server Action Pattern

Create server actions in `app/actions/` directory:

#### Server Action Best Practices

1. **File Organization**: Group actions by feature/module
2. **Error Handling**: Always handle errors gracefully
3. **Loading States**: Show loading indicators during async operations
4. **Toast Notifications**: Use `sonner` for user feedback
5. **Type Safety**: Define proper TypeScript types for request/response

---

## 🗄️ State Management

### Zustand (Required)

**Use Zustand for global state management.**

#### When to Use Zustand

- **User Authentication**: Store user data, tokens, auth status
- **Global Filters**: Search filters, pagination state
- **UI State**: Theme, sidebar state, modal state

---

## 🧩 Custom Components

### Required Custom Components

- Separate UI components, common elements, layout components, and modular blocks.
- Ensure components are reusable and self-contained.
- Maintain a clear separation between public pages and dashboard UI elements.
- For modal/popup use CustomModal from components
- For popover use CustomPopover from components
- For table use CustomTable from components
- Use components from components/ui

### Component Best Practices

1. **Reusability**: Create components that can be used across the app
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Composition**: Build complex UIs by composing smaller components
4. **Separation**: Keep business logic separate from presentation
5. **Accessibility**: Ensure components are accessible (ARIA labels, keyboard nav)

---

## 🎯 Code Standards

### TypeScript

- Use TypeScript for all files
- Define interfaces for all data structures
- Avoid `any` type - use proper types
- Use type inference where possible

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Server Actions: `camelCase.ts`
- Stores: `useCamelCase.ts`

### Import Order

1. React imports
2. Third-party libraries
3. Components
4. Utils/helpers
5. Types

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Remember**: Consistency is key. Follow these guidelines for all new code to maintain a clean, maintainable codebase.
