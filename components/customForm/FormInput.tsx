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
import { cn } from "@/lib/utils";

interface FormInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "email" | "number" | "tel" | "url";
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
  className,
  required = false,
}: FormInputProps<TFieldValues>) {
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
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={field.value ?? ""}
              className={cn(
                "border-border bg-background",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "placeholder:text-muted-foreground"
              )}
            />
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
