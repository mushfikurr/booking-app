"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

const RouteTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const [routeState, setRouteState] = React.useState(props.value);

  React.useEffect(() => {
    const splitPath = pathname.split("/");
    const endRoute = splitPath[splitPath.length - 1];
    setRouteState(endRoute);
  }, [pathname]);

  return (
    <TabsPrimitive.Root
      ref={ref}
      value={routeState}
      onValueChange={(value) => {
        router.push(value);
      }}
      className={cn(className)}
      {...props}
    ></TabsPrimitive.Root>
  );
});

export { RouteTabs };
