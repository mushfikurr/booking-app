import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Skeleton className="flex items-center justify-center flex-col h-full border border-border rounded-lg animate-pulse">
      <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
    </Skeleton>
  );
}
