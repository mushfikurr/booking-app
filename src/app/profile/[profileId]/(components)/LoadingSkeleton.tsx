import { Loader2 } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <div className="h-32 bg-muted rounded-md border border-border p-6 flex flex-col items-center justify-center text-muted-foreground">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
}
