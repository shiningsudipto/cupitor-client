# Schemas Directory

This directory contains all Zod validation schemas used throughout the application.

## Structure

```
schemas/
├── auth.schema.ts      # Authentication schemas (login, register)
├── user.schema.ts      # User profile schemas
├── job.schema.ts       # Job-related schemas
└── README.md          # This file
```

## Usage

### Import a schema

```typescript
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
```

### Use with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
```

## Best Practices

1. **One schema per form**: Create a dedicated schema for each form
2. **Export types**: Always export the inferred TypeScript type
3. **Descriptive names**: Use clear, descriptive names for schemas
4. **Helpful messages**: Include user-friendly error messages
5. **Reusable schemas**: Create base schemas for common patterns

## Adding New Schemas

When adding a new schema:

1. Create a new file or add to an existing related file
2. Define the schema using Zod
3. Export both the schema and its TypeScript type
4. Add helpful validation messages
5. Update this README if adding a new file

## Example

```typescript
import * as z from "zod";

export const exampleSchema = z.object({
  field: z.string().min(1, "Field is required"),
});

export type ExampleFormValues = z.infer<typeof exampleSchema>;
```
