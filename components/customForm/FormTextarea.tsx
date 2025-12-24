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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  required?: boolean;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled = false,
  className,
  rows = 4,
  maxLength,
  showCount = false,
  required = false,
}: FormTextareaProps<TFieldValues>) {
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
              <Textarea
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                {...field}
                value={field.value ?? ""}
                className={cn(
                  "border-border bg-background resize-none",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "placeholder:text-muted-foreground"
                )}
              />
              {showCount && maxLength && (
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {field.value?.length || 0}/{maxLength}
                </div>
              )}
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
