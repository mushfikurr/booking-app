import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

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
    <div className="p-5 border border-accent/90 hover:bg-accent/70 transition-all duration-300 ease-in-out text-accent-foreground rounded-sm flex flex-col gap-2 min-h-fit group">
      <span className="flex gap-2 items-center">
        <h3 className="text-xl font-medium tracking-tight leading-none">
          {title}
        </h3>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-all duration-200 ease-out text-muted group-hover:text-foreground" />
      </span>

      <div className="flex flex-col gap-3">
        <p className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
          {description}
        </p>

        <Link
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex items-center gap-2 w-fit h-fit"
          )}
          href={navigateUrl}
        >
          {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
