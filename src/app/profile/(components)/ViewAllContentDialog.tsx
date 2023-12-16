import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ViewAllContent {
  classNames?: string;
  title: string;
  children: React.ReactNode[];
}

export function ViewAllContent({
  children,
  title,
  classNames,
}: ViewAllContent) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className={cn(
            "inline-flex gap-1 items-center text-sm font-medium text-foreground/60 transition duration-200 ease-in-out group",
            "hover:text-foreground hover:cursor-pointer"
          )}
        >
          <ArrowUpRight
            className={cn(
              "transition duration-150 ease-in-out scale-100",
              "group-hover:scale-110"
            )}
          />
          <p>View All</p>
        </span>
      </DialogTrigger>
      <DialogContent className={cn(classNames, "gap-6 sm:max-w-2xl")}>
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
