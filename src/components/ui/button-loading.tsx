import { Loader2 } from "lucide-react";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, ...props }, ref) => {
    return (
      <Button
        disabled
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {children}
      </Button>
    );
  }
);

export default ButtonLoading;
