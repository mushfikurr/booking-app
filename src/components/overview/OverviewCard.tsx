"use client";

import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { LucideIcon, Users } from "lucide-react";

interface OverviewCardProps {
  subheading: string;
  main: string;
  description: string;
  Icon: LucideIcon;
}

export default function OverviewCard({
  subheading,
  main,
  description,
  Icon,
}: OverviewCardProps) {
  return (
    <div className="flex-auto flex gap-10 justify-between p-8 text-primary-foreground bg-primary rounded-3xl border border-border drop-shadow-sm items-center animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-200">
      <div className="flex flex-col lg:gap-1 gap-2 justify-between w-full">
        <h3 className="text-md tracking-tight leading-none text-primary-foreground/80">
          {subheading}
        </h3>
        <div className="space-y-1 lg:space-y-0">
          <h5 className="text-xl lg:text-2xl font-semibold leading-none tracking-wide">
            {main}
          </h5>
          <p className="leading-none text-sm">{description}</p>
        </div>
      </div>
      <div className="">
        <Icon className="h-12 w-12" />
      </div>
    </div>
  );
}
