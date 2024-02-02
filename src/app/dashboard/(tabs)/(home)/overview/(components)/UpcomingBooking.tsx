"use client";

import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import {
  BookingIncludesUserAndServices,
  useUpcomingBooking,
} from "@/lib/hooks/useBookingsForBusiness";
import { cn, getHMFromDateTime, todayNoTime } from "@/lib/utils";
import { Service } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface UpcomingBookingProps {
  businessUserId?: string;
  prefetchedBooking?: BookingIncludesUserAndServices;
}

export function UpcomingBooking(props: UpcomingBookingProps) {
  const booking = useUpcomingBooking(
    new Date(),
    props.businessUserId,
    props.prefetchedBooking
  );
  const user = booking.data?.user;
  const fullName = user?.name;
  const startTime = booking.data?.startTime
    ? new Date(booking.data.startTime)
    : null;
  const startTimeFormatted = startTime ? getHMFromDateTime(startTime) : "";
  const todayOrDate =
    startTime?.getDate() === todayNoTime().getDate()
      ? "today"
      : startTime?.toUTCString().substring(4, 16);

  return (
    <div
      className={cn(
        "border border-border text-foreground rounded-lg p-6 flex gap-32 items-center drop-shadow-lg",
        "max-md:flex-col max-md:gap-9"
      )}
    >
      <div
        className={cn(
          "space-y-2 min-w-fit basis-2/3",
          "max-md:w-full",
          !booking.data && "space-y-1"
        )}
      >
        <span className={"inline-flex gap-2 items-center"}>
          <h2 className="font-semibold text-muted-foreground">Next booking</h2>
          {booking.isFetching && (
            <Loader2 className="animate-spin text-foreground/60 h-4 w-4" />
          )}
        </span>
        {!booking.data && (
          <h3 className="text-lead leading-tight text-muted-foreground">
            No upcoming bookings
          </h3>
        )}

        <div>
          <h3 className="font-semibold text-xl leading-tight">{fullName}</h3>
          {booking.data && (
            <h5 className="font-normal text-foreground/80">
              {startTimeFormatted} {todayOrDate}
            </h5>
          )}
        </div>
        {/* <Button variant="secondary" className="w-full gap-3 items-center">
          <Search
            size={16}
            strokeWidth={2.6}
            className="text-secondary-foreground/80"
          />
          Navigate to
        </Button> */}
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
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-semibold">{amountOfServices}</h2>
      <h3 className="text-foreground/80">{label}</h3>
    </div>
  );
}

function ServicesWaitTile({ services }: { services?: Service[] }) {
  const { totalWait } = useBookingStatistics(services ?? []);

  if (!services) {
    return;
  }
  const label = "long";

  return (
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-semibold">{totalWait}</h2>
      <h3 className="text-foreground/80">{label}</h3>
    </div>
  );
}

function ServicesCostTile({ services }: { services?: Service[] }) {
  const { totalCost } = useBookingStatistics(services ?? []);
  const label = "in revenue";

  if (!services) {
    return;
  }

  return (
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-semibold">{totalCost}</h2>
      <h3 className="text-foreground/80">{label}</h3>
    </div>
  );
}
