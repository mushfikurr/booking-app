import { cn } from "@/lib/utils";

interface ComingSoonPage extends React.HTMLAttributes<HTMLDivElement> {}

export default function ComingSoonPage({
  className,
  ...props
}: ComingSoonPage) {
  return (
    <div className={cn(className, "flex h-full items-center justify-center")}>
      <div className={cn("flex flex-col text-center gap-6")}>
        <p className="text-3xl animate-in fade-in slide-in-from-bottom-8 ease-in-out duration-500 cursor-default select-none">
          🚀
        </p>

        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-200">
          <h1 className="font-medium text-xl">
            This page is currently in development
          </h1>
          <h3 className="text-foreground/80 text-md">
            Check back soon, we are working hard on getting this feature built!
          </h3>
        </div>
      </div>
    </div>
  );
}
