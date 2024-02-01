"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
}

export function CollapsibleCard({ title, children }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="border border-border px-4 p-3 rounded-lg space-y-2 drop-shadow-sm">
        <CollapsibleTrigger className="inline-flex justify-between w-full items-center group/animated-collapsible">
          <h2 className="font-medium">{title}</h2>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition duration-200 ease-in-out text-muted-foreground",
              "group-hover/animated-collapsible:text-foreground",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn(
            "overflow-hidden",
            "transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
          )}
        >
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
