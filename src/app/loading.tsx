import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default async function Loading() {
  return (
    <div className="max-w-full min-h-screen flex flex-col gap-5">
      <Skeleton className="animate-pulse text-foreground">
        <div className="flex items-center justify-center h-full w-full">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>
      </Skeleton>
    </div>
  );
}
