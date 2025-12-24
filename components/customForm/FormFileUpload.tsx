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
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFileUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
  required?: boolean;
  multiple?: boolean;
}

export function FormFileUpload<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  accept,
  maxSize = 5, // 5MB default
  disabled = false,
  className,
  required = false,
  multiple = false,
}: FormFileUploadProps<TFieldValues>) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFileName(file.name);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const clearFile = (onChange: (value: any) => void) => {
    setFileName("");
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ref: fieldRef, ...field } }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-foreground font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="space-y-3">
              {/* Upload Area */}
              <div
                className={cn(
                  "relative border-2 border-dashed border-border rounded-lg",
                  "hover:border-primary transition-colors cursor-pointer",
                  "bg-background"
                )}
                onClick={() => inputRef.current?.click()}
              >
                <Input
                  ref={(e) => {
                    fieldRef(e);
                    (
                      inputRef as React.MutableRefObject<HTMLInputElement | null>
                    ).current = e;
                  }}
                  type="file"
                  accept={accept}
                  disabled={disabled}
                  multiple={multiple}
                  onChange={(e) => handleFileChange(e, onChange)}
                  className="hidden"
                  {...field}
                />
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="text-sm text-foreground font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {accept ? `Accepted: ${accept}` : "All file types accepted"}
                    {" • "}
                    Max size: {maxSize}MB
                  </p>
                </div>
              </div>

              {/* Preview/File Info */}
              {(preview || fileName) && (
                <div className="relative border border-border rounded-lg p-3 bg-muted/30">
                  <button
                    type="button"
                    onClick={() => clearFile(onChange)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {preview ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {fileName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Image file
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center">
                        <File className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {fileName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Document file
                        </p>
                      </div>
                    </div>
                  )}
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
