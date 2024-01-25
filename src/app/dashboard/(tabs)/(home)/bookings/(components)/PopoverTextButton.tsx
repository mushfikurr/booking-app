"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarSearch, LucideIcon } from "lucide-react";

interface PopoverTextButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  CustomIcon?: LucideIcon;
  displayContent?: React.ReactNode;
}

export default function PopoverTextButton({
  className,
  children,
  CustomIcon,
  displayContent,
  ...props
}: PopoverTextButtonProps) {
  const DefaultCustomIcon = CustomIcon ?? CalendarSearch;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("gap-3 items-center p-5 text-foreground/80", className)}
          {...props}
        >
          <DefaultCustomIcon className={cn("h-5 w-5 text-foreground/80")} />
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>{displayContent}</PopoverContent>
    </Popover>
  );
}
