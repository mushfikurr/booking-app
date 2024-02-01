import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { ScrollableArea } from "./BookingDialog";

interface ViewAllContentProps {
  classNames?: string;
  title: string;
  children: React.ReactNode[];
}

export function ViewAllContent({
  children,
  title,
  classNames,
}: ViewAllContentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "inline-flex gap-1 items-center text-sm font-medium text-foreground/60 transition duration-200 ease-in-out group",
            "hover:text-foreground hover:cursor-pointer"
          )}
        >
          <ArrowUpRight />
          <p>View All</p>
        </button>
      </DialogTrigger>
      <DialogContent
        className={cn("overflow-clip max-h-[calc(100vh-10rem)]", classNames)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <ScrollableArea>
          <div className="flex flex-col gap-6 overflow-auto">{children}</div>
        </ScrollableArea>
      </DialogContent>
    </Dialog>
  );
}
