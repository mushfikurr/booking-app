import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function FullPageSkeleton() {
  return (
    <Skeleton className="h-full rounded-md p-6 flex flex-col items-center justify-center">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </Skeleton>
  );
}
