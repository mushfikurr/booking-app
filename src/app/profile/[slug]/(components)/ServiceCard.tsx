"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
const humanizeDuration = require("humanize-duration");

export function ServiceCard({
  name,
  price,
  estimatedTime,
  description,
}: Service) {
  const displayedEstimatedTime = humanizeDuration(estimatedTime * 1000);

  return (
    <div
      className={cn(
        "border border-border rounded-lg flex items-stretch min-w-full drop-shadow-sm",
        "max-sm:flex-col"
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center bg-primary text-primary-foreground rounded-l-lg items-end px-4 py-5 min-w-[110px]",
          "max-sm:rounded-t-lg max-sm:rounded-b-none max-sm:py-4 max-sm:gap-3 max-sm:flex-row max-sm:items-start max-sm:justify-between max-sm:px-6"
        )}
      >
        <h3 className="text-md font-semibold leading-tighter">£{price}</h3>
        <p className="text-sm text-primary-foreground/80 truncate">
          {displayedEstimatedTime}
        </p>
      </div>
      <div
        className={cn(
          "grow flex flex-col justify-center px-4 py-5",
          "max-sm:py-4"
        )}
      >
        <h3 className="text-md font-medium">{name}</h3>
        <p className="max-sm:line-clamp-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-[inherit] border-l border-border px-8 rounded-none text-sm font-normal",
          "max-sm:border-l-0 max-sm:border-t max-sm:py-4"
        )}
      >
        Book
      </button>
    </div>
  );
}
