import { cn } from "@/lib/utils";

interface ComingSoonPage extends React.HTMLAttributes<HTMLDivElement> {}

export default function ComingSoonPage({
  className,
  ...props
}: ComingSoonPage) {
  return (
    <div className={cn(className, "flex h-full items-center justify-center")}>
      <div className="flex flex-col text-center gap-6">
        <p className="text-3xl">🚀</p>
        <div className="text-center space-y-1">
          <h1 className="font-medium text-xl">
            This page is currently in development
          </h1>
          <h3 className="text-foreground/80">
            Check back soon, we are working hard on getting this feature built!
          </h3>
        </div>
      </div>
    </div>
  );
}
