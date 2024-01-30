"use client";

import { Slot } from "@/lib/hooks/useSlots";
import { cn, getHMFromDateTime } from "@/lib/utils";
import { useBookingDialogContext } from "./BookingDialogContext";

interface SelectableDateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thisSlot: Slot;
  day: string;
}

export function SelectableSlot({
  thisSlot,
  day,
  ...props
}: SelectableDateProps) {
  const startTime = getHMFromDateTime(thisSlot.startTime);
  const endTime = getHMFromDateTime(thisSlot.endTime);
  const { slot: currentSlot } = useBookingDialogContext();
  const selected = thisSlot.slotId === currentSlot?.slotId;

  return (
    <button
      className={cn(
        "border border-border p-3 rounded-md w-full transition duration-200 ease-in-out",
        {
          "hover:border-secondary-foreground/40": !selected,
          "border-secondary-foreground": selected,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      <div className="text-sm text-start">
        <h4>{day}</h4>
        <p className="text-muted-foreground">
          {startTime} - {endTime}
        </p>
      </div>
    </button>
  );
}
