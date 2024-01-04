import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "h-32 bg-muted rounded-md border border-border p-6 flex flex-col items-center justify-center text-muted-foreground",
        className
      )}
    >
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
}
