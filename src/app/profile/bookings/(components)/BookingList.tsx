"use client";

import { TextLink } from "@/components/TextLink";
import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import {
  BookingIncludesServicesAndBusiness,
  useBookingsForUser,
} from "@/lib/hooks/useBookingsForUser";
import { cn, getHMFromDateTime, googleMapsUrl } from "@/lib/utils";
import autoAnimate from "@formkit/auto-animate";
import { Loader2, MapPin, MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ActionsDropdown } from "./ActionsDropdown";
import { Empty } from "@/components/Empty";

interface BookingListProps {
  prefetchedBookings: BookingIncludesServicesAndBusiness[];
}

export function BookingList({ ...props }: BookingListProps) {
  const session = useSession();
  const bookings = useBookingsForUser(
    session.data?.user?.id,
    props.prefetchedBookings
  );
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const renderBookingView = () => {
    if (!bookings.data?.length)
      return <Empty>You have not created any bookings yet.</Empty>;
    return bookings.data?.map((b) => (
      <Booking key={b.id} booking={b} isFetching={bookings.isFetching} />
    ));
  };

  return (
    <div className="space-y-3">
      {bookings.isFetching && (
        <Loader2 className="h-5 w-5 text-foreground/60 animate-spin mb-3" />
      )}
      <div className="grid grid-auto-fit-md gap-3" ref={parent}>
        {renderBookingView()}
      </div>
    </div>
  );
}

interface Booking {
  booking: BookingIncludesServicesAndBusiness;
  isFetching?: boolean;
}
function Booking({ booking, ...props }: Booking) {
  const statistics = useBookingStatistics(booking.services);
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const formatted = `${getHMFromDateTime(startDate)} - ${getHMFromDateTime(
    endDate
  )}`;
  const date = new Date(booking.date);
  const mapsLink = googleMapsUrl({
    q: `${booking.businessUser.streetAddress1} ${booking.businessUser.streetAddress2} ${booking.businessUser.postcode}`,
  });

  return (
    <div
      className={cn(
        "border border-border p-4 rounded-md space-y-3 shadow-sm",
        props.isFetching && "animate-pulse"
      )}
    >
      <div className="inline-flex justify-between items-center gap-10 w-full">
        <TextLink href={`/business/${booking.businessUser.profileId}`}>
          @{booking.businessUser.profileId}
        </TextLink>
        <ActionsDropdown booking={booking} disabled={props.isFetching}>
          <MoreVertical
            className={cn(
              "h-4 w-4 text-foreground/60 transition duration-200 ease-in-out cursor-pointer",
              props.isFetching && "hover:text-foreground/60 cursor-default",
              "hover:text-foreground"
            )}
          />
        </ActionsDropdown>
      </div>

      <div>
        <div className="font-medium">
          {date.toUTCString().substring(0, 11)} {formatted}
          <p className="font-normal text-foreground/80">
            {statistics.totalCost}
          </p>
        </div>
        <div className="pt-2 text-xs flex gap-3">
          <Link href={mapsLink} target="_blank">
            <span
              className={cn(
                "text-sm inline-flex gap-2 items-center text-foreground/80 cursor-pointer",
                "hover:text-foreground",
                "transition duration-200 ease-in-out"
              )}
            >
              <MapPin className="h-4 w-4" />
              <p>Locate</p>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {booking.services.map((s) => (
          <div
            key={s.id}
            className="border border-border p-2 px-3 rounded-sm w-fit text-xs"
          >
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
