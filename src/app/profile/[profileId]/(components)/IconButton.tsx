import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  Icon: LucideIcon;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}
export default function IconButton({
  Icon,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex gap-3 text-muted-foreground items-center font-medium group/add-services",
        "hover:text-foreground active:text-foreground",
        "transition duration-200 ease-in-out",
        props.className
      )}
      onClick={props.onClick}
    >
      <Icon className="h-4 w-4 group-hover/add-services:scale-105 transition duration-100 ease-in-out" />
      <p className="text-sm">{children}</p>
    </button>
  );
}
