import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export interface ManageBusinessCardProps {
  title: string;
  description: string;
  navigateUrl: string;
  buttonText: string;
  ButtonIcon?: LucideIcon;
}

export default function ManageBusinessCard({
  title,
  description,
  navigateUrl,
  buttonText,
  ButtonIcon,
}: ManageBusinessCardProps) {
  return (
    <div className="p-8 border border-border bg-accent text-accent-foreground rounded-sm space-y-1 min-h-fit group">
      <span className="flex gap-2 items-center">
        <h3 className="text-xl font-semibold tracking-tight leading-none">
          {title}
        </h3>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-all duration-200 ease-out text-muted group-hover:text-foreground" />
      </span>

      <div className="space-y-3">
        <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">
          {description}
        </p>

        <Link
          className={cn(buttonVariants(), "flex items-center gap-2 w-fit")}
          href={navigateUrl}
        >
          {ButtonIcon && <ButtonIcon className="h-4 w-4 text-muted" />}
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
