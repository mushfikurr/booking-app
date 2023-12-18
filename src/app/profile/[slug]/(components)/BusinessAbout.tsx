"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface BusinessAbout {
  businessTitle: string;
  about: string;
}

export function BusinessAbout({ businessTitle, about }: BusinessAbout) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-0.5">
      <button
        className="flex items-center w-full align-left gap-3 text-foreground/80 hover:text-foreground transition-colors duration-150 ease-in-out"
        onClick={handleOpen}
      >
        <h5 className="font-medium">About {businessTitle}</h5>
        <ChevronDown
          className={cn("w-4 h-4 transition duration-200 ease-in-out", {
            "-rotate-180": isOpen,
          })}
        />
      </button>
      <p
        className={cn("text-muted-foreground line-clamp-2", {
          "line-clamp-none": isOpen,
        })}
      >
        {about}
      </p>
    </div>
  );
}
