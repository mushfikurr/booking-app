import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default async function Loading() {
  return (
    <div className="max-w-full h-full flex flex-col gap-5">
      <Skeleton className="animate-pulse bg-text-foreground bg-accent h-full w-full">
        <div className="p-256 flex items-center justify-center h-full w-full">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>
      </Skeleton>
    </div>
  );
}
