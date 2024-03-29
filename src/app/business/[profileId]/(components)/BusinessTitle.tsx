"use client";

import { TextLink } from "@/components/TextLink";
import { Button } from "@/components/ui/button";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { StartBooking } from "./BookingDialog";

interface BusinessTitleProps {
  businessUser: UserWithBusinessUser;
}

export function BusinessTitle({ businessUser }: BusinessTitleProps) {
  const title = businessUser?.businessDisplayName;
  const streetAddress = [
    businessUser?.streetAddress1,
    businessUser?.streetAddress2 ?? undefined,
    businessUser?.postcode,
  ].filter(Boolean);
  const location = streetAddress.join(", ");

  return (
    <div
      className={cn({
        "bg-background pt-6 pb-4 z-10 flex justify-between items-center gap-3 sticky top-16":
          true,
        "max-sm:flex-col max-sm:items-start": true,
      })}
    >
      <div className="space-y-1.5">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight",
            "max-sm:text-2xl"
          )}
        >
          {title}
        </h1>
        <span className="inline-flex gap-2 text-muted-foreground">
          <TextLink className={cn("text-md", "max-sm:text-sm")} href="">
            <MapPin className="max-sm:h-5 w-5" />
            {location}
          </TextLink>
        </span>
      </div>

      <StartBooking businessUser={businessUser}>
        <Button className={cn("px-10 py-6", "px-6")}>Start booking</Button>
      </StartBooking>
    </div>
  );
}
