"use client";

import { LucideIcon } from "lucide-react";
import { Skeleton } from "../../../../../../components/ui/skeleton";

interface OverviewCardProps {
  subheading: string;
  main: string;
  description: string;
  Icon: LucideIcon;
  isLoading?: boolean;
}

function OverviewCardLoading() {
  return (
    <Skeleton className="animate-pulse flex-auto flex gap-10 justify-between p-8 text-primary-foreground bg-primary rounded-3xl drop-shadow-sm items-center animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-200">
      <div className="flex flex-col gap-3 justify-between w-full">
        <h3 className="invisible text-md tracking-tight leading-none text-primary-foreground/80">
          Subheading...
        </h3>
        <div className="space-y-1 lg:space-y-0">
          <h5 className="invisible text-xl lg:text-2xl font-semibold leading-none tracking-wide">
            Main ...
          </h5>
          <p className="leading-none text-sm invisible">Description...</p>
        </div>
      </div>
      <div className=""></div>
    </Skeleton>
  );
}

export default function OverviewCard({
  subheading,
  main,
  description,
  Icon,
  isLoading,
}: OverviewCardProps) {
  if (isLoading) {
    return <OverviewCardLoading />;
  }

  return (
    <div className="flex-auto flex gap-10 border border-border justify-between p-5 px-5 text-foreground rounded-lg drop-shadow-sm items-center animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-200">
      <div className="flex flex-col gap-3 justify-between w-full">
        <h3 className="text-sm tracking-tight leading-none text-foreground/80">
          {subheading}
        </h3>
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
        <Icon className="h-7 w-7 text-foreground/50" />
      </div>
    </div>
  );
}
