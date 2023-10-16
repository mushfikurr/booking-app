import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default async function Loading() {
  return (
    <div className="max-w-5xl flex flex-col gap-5">
      <Skeleton className="animate-pulse bg-text-foreground bg-accent">
        <div className="py-64 flex items-center justify-center h-full w-full">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>
      </Skeleton>
    </div>
  );
}
