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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface FormRadioProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  options: RadioOption[];
  disabled?: boolean;
  className?: string;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
}

export function FormRadio<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  disabled = false,
  className,
  required = false,
  orientation = "vertical",
}: FormRadioProps<TFieldValues>) {
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
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-row gap-4"
                  : "flex flex-col space-y-2"
              )}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className={cn(
                        "border-border text-primary",
                        "focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      )}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="font-normal cursor-pointer text-foreground">
                      {option.label}
                    </FormLabel>
                    {option.description && (
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
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
