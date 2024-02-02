"use client";

import { Loader2, LucideIcon } from "lucide-react";
import { Skeleton } from "../../../../../../components/ui/skeleton";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  subheading: string;
  main: React.ReactNode;
  description: string;
  Icon: LucideIcon;
  isLoading?: boolean;
  isRefetching?: boolean;
}

export default function OverviewCard({
  subheading,
  main,
  description,
  Icon,
  isLoading,
  isRefetching,
}: OverviewCardProps) {
  return (
    <div
      className={cn(
        "flex-auto flex gap-10 border border-border justify-between p-5 px-5 text-foreground rounded-lg drop-shadow-sm items-center",
        "animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-300"
      )}
    >
      <div className="flex flex-col gap-3 justify-between w-full">
        <span className="inline-flex gap-3 items-center">
          <h3 className="text-sm tracking-tight leading-none font-semibold text-foreground/80">
            {subheading}
          </h3>
          {isRefetching && (
            <Loader2 className="h-4 w-4 animate-spin text-foreground/60" />
          )}
        </span>

        <div className="space-y-1">
          <h5 className="text-xl font-semibold leading-none tracking-wide">
            {main}
          </h5>
          <p className="leading-none text-sm text-foreground/90">
            {description}
          </p>
        </div>
      </div>
      <div className="h-full">
        <Icon className="h-5 w-5 text-foreground/50" />
      </div>
    </div>
  );
}

function OverviewCardLoading() {
  return (
    <Skeleton className="flex-auto flex gap-10 justify-between p-8 text-primary-foreground bg-primary rounded-3xl drop-shadow-sm items-center animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-200">
      <div className="flex flex-col gap-3 justify-between w-full"></div>
    </Skeleton>
  );
}
