"use client";

import { Button } from "@/components/ui/button";
import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import {
  BookingIncludesUserAndServices,
  useUpcomingBooking,
} from "@/lib/hooks/useBookings";
import { cn, getHMFromDateTime, todayNoTime } from "@/lib/utils";
import { Service } from "@prisma/client";
import { Search } from "lucide-react";

interface UpcomingBooking {
  businessUserId: string;
  prefetchedBooking: BookingIncludesUserAndServices;
}

export function UpcomingBooking(props: UpcomingBooking) {
  const booking = useUpcomingBooking(
    new Date(),
    props.businessUserId,
    props.prefetchedBooking
  );
  const user = booking.data?.user;
  const fullName = user?.name;
  const startTime = new Date(booking.data?.startTime as Date);
  const startTimeFormatted = getHMFromDateTime(startTime);
  const todayOrDate =
    startTime?.getDate() === todayNoTime().getDate()
      ? "today"
      : startTime?.toUTCString().substring(4, 16);

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground rounded-xl p-9 flex gap-32 items-center drop-shadow-lg",
        "max-md:flex-col max-md:gap-9"
      )}
    >
      <div className={cn("space-y-3 min-w-fit basis-2/3", "max-md:w-full")}>
        <h2 className="font-medium">Upcoming booking</h2>
        <div>
          <h3 className="font-semibold text-2xl leading-tight">{fullName}</h3>
          <h5 className="font-normal text-primary-foreground/80">
            {startTimeFormatted} {todayOrDate}
          </h5>
        </div>
        <Button variant="secondary" className="w-full gap-3 items-center">
          <Search
            size={16}
            strokeWidth={2.6}
            className="text-secondary-foreground/80"
          />
          Navigate to
        </Button>
      </div>
      <div className="flex w-full gap-4 justify-between">
        <ServicesCountTile services={booking.data?.services} />
        <ServicesWaitTile services={booking.data?.services} />
        <ServicesCostTile services={booking.data?.services} />
      </div>
    </div>
  );
}

function ServicesCountTile({ services }: { services?: Service[] }) {
  if (!services) {
    return;
  }
  const amountOfServices = services?.length;
  const label = amountOfServices > 1 ? "services" : "service";

  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl">{amountOfServices}</h2>
      <h3 className="text-primary-foreground/80">{label}</h3>
    </div>
  );
}

function ServicesWaitTile({ services }: { services?: Service[] }) {
  if (!services) {
    return;
  }
  const { totalWait } = useBookingStatistics(services);
  const label = "long";

  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl">{totalWait}</h2>
      <h3 className="text-primary-foreground/80">{label}</h3>
    </div>
  );
}

function ServicesCostTile({ services }: { services?: Service[] }) {
  if (!services) {
    return;
  }
  const { totalCost } = useBookingStatistics(services);
  const label = "in revenue";

  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl">{totalCost}</h2>
      <h3 className="text-primary-foreground/80">{label}</h3>
    </div>
  );
}
