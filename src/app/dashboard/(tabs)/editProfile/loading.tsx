import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <Skeleton className="bg-text-foreground bg-accent h-full w-full rounded-lg">
        <div className="p-256 flex items-center justify-center h-full w-full"></div>
      </Skeleton>
    </div>
  );
}
