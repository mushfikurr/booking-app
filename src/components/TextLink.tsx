import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface TextLinkProps {
  href: string;
  className?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
}

export function TextLink({ className, Icon, href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex gap-3 text-sm items-center font-medium text-muted-foreground",
        "hover:text-foreground",
        "transition-colors duration-200 ease-in-out group/textlink",
        className
      )}
    >
      <span className="inline-flex gap-3 items-center">
        {Icon && <Icon />}
        {children}
      </span>
      <ArrowRight
        className={cn(
          "h-4 w-4 -translate-x-1 align-center",
          "group-hover/textlink:opacity-100 group-hover/textlink:translate-x-0",
          "transition-transform duration-200 ease-out"
        )}
      />
    </Link>
  );
}
