"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBookingDialogContext } from "./BookingDialogContext";
import { cn } from "@/lib/utils";

export function BackButton() {
  const { prevPage, pageStack } = useBookingDialogContext();

  if (pageStack.length === 1) return;

  return (
    <Button
      className={cn(
        "inline-flex gap-2 text-foreground/80",
        "max-sm:px-5",
        "hover:text-foreground"
      )}
      variant="outline"
      size="lg"
      onClick={() => prevPage()}
    >
      <ArrowLeft className="h-4 w-4" />
      <p className={cn("block", "max-sm:hidden")}>Back</p>
    </Button>
  );
}
