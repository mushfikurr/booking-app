import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Skeleton className="container flex items-center justify-center w-full flex-col space-y-8 py-8 sm:w-[600px] sm:h-[482px] border border-border rounded-lg animate-pulse">
      <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
    </Skeleton>
  );
}
