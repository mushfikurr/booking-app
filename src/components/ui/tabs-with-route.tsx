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
  const defaultValue =
    pathname.split("/").length === 1 ? "overview" : routeState;

  React.useEffect(() => {
    // TODO: Make this dynamic
    const splitPath = pathname.split("/");
    if (splitPath.length === 3) {
      const endRoute = splitPath[2];
      setRouteState(endRoute);
    }
  }, [pathname]);

  return (
    <TabsPrimitive.Root
      ref={ref}
      value={routeState}
      defaultValue={defaultValue}
      onValueChange={(value) => {
        router.push(`/dashboard/${value}`);
      }}
      className={cn(className)}
      {...props}
    ></TabsPrimitive.Root>
  );
});

export { RouteTabs };
