import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <main className="container max-w-5xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 rounded-lg py-16 px-16 border border-border bg-muted/20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">
            Booking made{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">
              simple
            </span>
            .
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-md text-muted-foreground">
              Discover services near you
            </p>
            <Skeleton className="flex gap-2 min-w-md animate-pulse"></Skeleton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Featured services</h2>
          <div className="sm:grid grid-cols-3 gap-8">
            <Skeleton className="flex flex-col border border-border rounded-md py-4 group h-48 animate-pulse" />
            <Skeleton className="flex flex-col border border-border rounded-md py-4 group h-48 animate-pulse" />
            <Skeleton className="flex flex-col border border-border rounded-md py-4 group h-48 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
