"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";

interface TextButtonProps {
  className?: string;
  Icon?: LucideIcon;
  RightIcon?: LucideIcon;
  onClick?: () => void;
  children: React.ReactNode;
}

export function TextButton({
  className,
  Icon,
  RightIcon = ArrowRight,
  onClick,
  children,
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex gap-3 text-sm items-center font-medium text-muted-foreground",
        "hover:text-foreground",
        "transition-colors duration-200 ease-in-out group/textbutton",
        className
      )}
    >
      <span className="inline-flex gap-3 items-center">
        {Icon && <Icon />}
        {children}
      </span>
      <RightIcon
        className={cn(
          "h-4 w-4 opacity-0 -translate-x-1 align-center",
          "group-hover/textbutton:opacity-100 group-hover/textbutton:translate-x-0",
          "transition-transform duration-200 ease-out"
        )}
      />
    </button>
  );
}
