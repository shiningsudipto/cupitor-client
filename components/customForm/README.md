# Custom Form Components

Reusable form field components for React Hook Form with built-in validation and styling following the Cupitor color scheme.

## 🎨 Color Scheme

All components follow the Cupitor color scheme:

- **Primary**: `#21f3be` (Mint/Turquoise) - Focus states, checkboxes, radio buttons
- **Secondary**: `#af9aff` (Purple/Lavender) - Supporting elements
- **Accent**: `#ff9356` (Orange/Coral) - Highlights
- **Destructive**: Error states and validation messages

## 📦 Available Components

### 1. FormInput

Text-based input fields (text, email, number, tel, url)

```typescript
import { FormInput } from "@/components/customForm";

<FormInput
  control={form.control}
  name="email"
  label="Email Address"
  placeholder="you@example.com"
  type="email"
  required
/>;
```

**Props:**

- `control` - React Hook Form control
- `name` - Field name
- `label?` - Field label
- `placeholder?` - Placeholder text
- `description?` - Helper text
- `type?` - Input type (text, email, number, tel, url)
- `disabled?` - Disable input
- `required?` - Show required indicator
- `className?` - Additional classes

---

### 2. FormPassword

Password input with show/hide toggle

```typescript
import { FormPassword } from "@/components/customForm";

<FormPassword
  control={form.control}
  name="password"
  label="Password"
  placeholder="Enter password"
  required
/>;
```

**Props:**

- Same as FormInput
- Automatically includes show/hide toggle button

---

### 3. FormTextarea

Multi-line text input with character count

```typescript
import { FormTextarea } from "@/components/customForm";

<FormTextarea
  control={form.control}
  name="bio"
  label="Bio"
  placeholder="Tell us about yourself"
  rows={4}
  maxLength={500}
  showCount
/>;
```

**Props:**

- `rows?` - Number of rows (default: 4)
- `maxLength?` - Maximum character count
- `showCount?` - Show character counter
- All other props from FormInput

---

### 4. FormCheckbox

Single checkbox field

```typescript
import { FormCheckbox } from "@/components/customForm";

<FormCheckbox
  control={form.control}
  name="terms"
  label="I agree to the terms and conditions"
  description="You must accept to continue"
/>;
```

**Props:**

- `control` - React Hook Form control
- `name` - Field name
- `label?` - Checkbox label
- `description?` - Helper text
- `disabled?` - Disable checkbox
- `className?` - Additional classes

---

### 5. FormRadio

Radio button group

```typescript
import { FormRadio } from "@/components/customForm";

<FormRadio
  control={form.control}
  name="experience"
  label="Experience Level"
  options={[
    { label: "Junior", value: "junior", description: "0-2 years" },
    { label: "Mid-level", value: "mid", description: "3-5 years" },
    { label: "Senior", value: "senior", description: "5+ years" },
  ]}
  orientation="vertical"
  required
/>;
```

**Props:**

- `options` - Array of `{ label, value, description? }`
- `orientation?` - "vertical" | "horizontal" (default: "vertical")
- All other props from FormInput

---

### 6. FormSelect

Standard dropdown select

```typescript
import { FormSelect } from "@/components/customForm";

<FormSelect
  control={form.control}
  name="country"
  label="Country"
  placeholder="Select a country"
  options={[
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ]}
  required
/>;
```

**Props:**

- `options` - Array of `{ label, value }`
- `placeholder?` - Placeholder text
- All other props from FormInput

---

### 7. FormSearchableSelect

Searchable dropdown with filter

```typescript
import { FormSearchableSelect } from "@/components/customForm";

<FormSearchableSelect
  control={form.control}
  name="skill"
  label="Primary Skill"
  placeholder="Select a skill"
  searchPlaceholder="Search skills..."
  options={skills.map((skill) => ({ label: skill.name, value: skill.id }))}
  required
/>;
```

**Props:**

- `options` - Array of `{ label, value }`
- `placeholder?` - Placeholder text
- `searchPlaceholder?` - Search input placeholder
- All other props from FormInput

---

### 8. FormFileUpload

File upload with preview

```typescript
import { FormFileUpload } from "@/components/customForm";

<FormFileUpload
  control={form.control}
  name="resume"
  label="Upload Resume"
  description="PDF, DOC, or DOCX (Max 5MB)"
  accept=".pdf,.doc,.docx"
  maxSize={5}
  required
/>;
```

**Props:**

- `accept?` - Accepted file types
- `maxSize?` - Max file size in MB (default: 5)
- `multiple?` - Allow multiple files
- All other props from FormInput

**Features:**

- Drag and drop support
- Image preview for image files
- File size validation
- Clear file button

---

### 9. FormSwitch

Toggle switch for boolean values

```typescript
import { FormSwitch } from "@/components/customForm";

<FormSwitch
  control={form.control}
  name="notifications"
  label="Enable Notifications"
  description="Receive email updates about new jobs"
/>;
```

**Props:**

- `control` - React Hook Form control
- `name` - Field name
- `label?` - Switch label
- `description?` - Helper text
- `disabled?` - Disable switch
- `className?` - Additional classes

---

## 🚀 Complete Example

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FormInput,
  FormPassword,
  FormTextarea,
  FormCheckbox,
  FormRadio,
  FormSelect,
  FormSearchableSelect,
  FormFileUpload,
} from "@/components/customForm";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  bio: z.string().max(500),
  terms: z.boolean().refine((val) => val === true, "Must accept terms"),
  experience: z.string(),
  country: z.string(),
  skill: z.string(),
  resume: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

export function ExampleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      terms: false,
      experience: "",
      country: "",
      skill: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
          required
        />

        <FormPassword
          control={form.control}
          name="password"
          label="Password"
          required
        />

        <FormTextarea
          control={form.control}
          name="bio"
          label="Bio"
          rows={4}
          maxLength={500}
          showCount
        />

        <FormRadio
          control={form.control}
          name="experience"
          label="Experience Level"
          options={[
            { label: "Junior", value: "junior" },
            { label: "Senior", value: "senior" },
          ]}
        />

        <FormSelect
          control={form.control}
          name="country"
          label="Country"
          options={[
            { label: "USA", value: "us" },
            { label: "UK", value: "uk" },
          ]}
        />

        <FormSearchableSelect
          control={form.control}
          name="skill"
          label="Primary Skill"
          options={[
            { label: "JavaScript", value: "js" },
            { label: "Python", value: "py" },
          ]}
        />

        <FormFileUpload
          control={form.control}
          name="resume"
          label="Resume"
          accept=".pdf,.doc,.docx"
        />

        <FormCheckbox
          control={form.control}
          name="terms"
          label="I agree to terms"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## 🎯 Best Practices

1. **Always use with React Hook Form** - These components are designed for RHF
2. **Define schemas in `/schemas`** - Keep validation logic separate
3. **Use TypeScript** - Get full type safety with inferred types
4. **Follow color scheme** - Components automatically use Cupitor colors
5. **Provide helpful labels** - Make forms accessible and user-friendly
6. **Add descriptions** - Help users understand what's expected
7. **Mark required fields** - Use the `required` prop for visual indicator

## 📚 Related Documentation

- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Schemas Directory](../../schemas/README.md)
- [Instructions](../../instructions.md)
