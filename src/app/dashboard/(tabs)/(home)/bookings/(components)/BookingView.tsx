"use client";

import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    BookingIncludesUserAndServices,
    useDescendingBookingsForDay
} from "@/lib/hooks/useBookings";
import { getHMFromDateTime } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import PopoverTextButton from "./PopoverTextButton";

interface BookingViewProps {
  prefetchedBookings: BookingIncludesUserAndServices[];
  businessUserId: string;
}

export function BookingView(props: BookingViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const selectedDayDisplayString =
    selectedDate?.toUTCString().substring(0, 16) ?? "No date selected";

  const displayCalendar = () => {
    return (
      <div className="flex items-center justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus
        ></Calendar>
      </div>
    );
  };

  const displayBookingList = () => {
    if (!selectedDate) {
      return <Empty>Please select a date to view bookings.</Empty>;
    }

    return (
      <div className="flex-grow">
        <BookingList
          prefetchedBookings={props.prefetchedBookings}
          businessUserId={props.businessUserId}
          selectedDate={selectedDate}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <PopoverTextButton displayContent={displayCalendar()} className="w-fit">
        {selectedDayDisplayString}
      </PopoverTextButton>
      {displayBookingList()}
    </div>
  );
}

interface BookingListProps {
  prefetchedBookings: BookingIncludesUserAndServices[];
  businessUserId: string;
  selectedDate: Date;
}

function BookingList(props: BookingListProps) {
  const bookings = useDescendingBookingsForDay(
    props.selectedDate,
    props.businessUserId,
    props.prefetchedBookings
  );

  if (bookings.isLoading) {
    return <LoadingSkeleton />;
  }

  if (!bookings.data?.length) {
    return (
      <Empty className="grow h-full">
        There are no bookings for the selected date.
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.data?.map((booking) => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

function Booking({ booking }: { booking: BookingIncludesUserAndServices }) {
  const servicesString = booking.services
    .map((service) => service.name)
    .join(", ");
  const nameSplit = booking.user?.name ? booking.user?.name?.split(" ") : "";
  const nameInitials =
    nameSplit.length > 1 ? nameSplit[0][0] + nameSplit[1][0] : nameSplit[0][0];
  const formattedTimeRange = `${getHMFromDateTime(
    booking.startTime
  )} - ${getHMFromDateTime(booking.endTime)}`;

  return (
    <div className="space-y-2">
      <p className="text-foreground/80">{formattedTimeRange}</p>
      <div className="flex justify-between items-center border border-border rounded-lg p-4">
        <div className="flex gap-5 drop-shadow-sm grow">
          <Avatar>
            <AvatarImage asChild>
              <Image src="https://picsum.photos/200" alt="Avatar Image" />
            </AvatarImage>
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-sm font-medium leading-tight">
              {booking.user.name}
            </h3>
            <p className="max-sm:line-clamp-1 truncate text-sm text-muted-foreground">
              {servicesString}
            </p>
          </div>
        </div>
        <div>
          <Button>Hello</Button>
        </div>
      </div>
    </div>
  );
}
