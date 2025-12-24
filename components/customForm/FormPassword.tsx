"use client";

import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormPasswordProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function FormPassword<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Enter password",
  description,
  disabled = false,
  className,
  required = false,
}: FormPasswordProps<TFieldValues>) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-foreground font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                value={field.value ?? ""}
                className={cn(
                  "pr-10 border-border bg-background",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "placeholder:text-muted-foreground"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors focus:outline-none"
                )}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </FormControl>
          {description && (
            <FormDescription className="text-muted-foreground text-sm">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
}
