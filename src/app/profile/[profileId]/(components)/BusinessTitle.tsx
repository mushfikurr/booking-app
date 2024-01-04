"use client";

import { TextLink } from "@/components/TextLink";
import { Button } from "@/components/ui/button";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { StartBooking } from "./BookingDialog";

interface BusinessTitleProps {
  businessUser: UserWithBusinessUser;
  callToAction?: () => void;
}

export function BusinessTitle({
  businessUser,
  callToAction,
}: BusinessTitleProps) {
  const title = businessUser?.user.name;

  return (
    <div
      className={cn({
        "bg-background pt-6 pb-4 z-10 flex justify-between items-center gap-3 sticky top-16":
          true,
        "max-sm:flex-col max-sm:items-start": true,
      })}
    >
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <span className="inline-flex gap-2 text-muted-foreground">
          <TextLink className="text-md" href="">
            <MapPin />
            223 Whitechapel Rd, E1 5JD
          </TextLink>
        </span>
      </div>

      <StartBooking businessUser={businessUser}>
        <Button className={cn("px-10 py-6")}>Start booking</Button>
      </StartBooking>
    </div>
  );
}
