"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: "sm" | "md" | "lg" | "xl" | "auto";
}

const widthClasses = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
  xl: "w-[32rem]",
  auto: "w-auto",
};

export function CustomPopover({
  trigger,
  children,
  title,
  description,
  footer,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  showCloseButton = true,
  className,
  contentClassName,
  open,
  onOpenChange,
  width = "md",
}: CustomPopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange || (() => {}) : setInternalOpen;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(widthClasses[width], "p-0", contentClassName)}
      >
        <div className={cn("relative", className)}>
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="flex items-start justify-between p-4 border-b border-border">
              <div className="flex-1">
                {title && (
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 p-1 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/30">
              {footer}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
