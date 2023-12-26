import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        <button
          className={cn(
            "inline-flex gap-1 items-center text-sm font-medium text-foreground/60 transition duration-200 ease-in-out group",
            "hover:text-foreground hover:cursor-pointer"
          )}
        >
          <ArrowUpRight
            className={cn(
              "transition duration-75 ease-in-out scale-100",
              "group-hover:scale-105"
            )}
          />
          <p>View All</p>
        </button>
      </DialogTrigger>
      <DialogContent
        className={cn("overflow-clip max-h-[calc(100vh-10rem)]", classNames)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className="flex flex-col gap-6 overflow-auto">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
