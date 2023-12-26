import { cn } from "@/lib/utils";

interface EmptyProps {
  className?: string;
  children: React.ReactNode;
}

export function Empty({ className, children }: EmptyProps) {
  return (
    <div
      className={cn(
        "border border-border h-32 rounded-md bg-muted text-muted-foreground flex flex-col items-center justify-center text-center p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
