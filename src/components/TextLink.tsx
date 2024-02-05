import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  Icon?: LucideIcon;
  target?: HTMLAttributeAnchorTarget;
}

export function TextLink({
  className,
  Icon,
  href,
  target,
  children,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      target={target}
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
