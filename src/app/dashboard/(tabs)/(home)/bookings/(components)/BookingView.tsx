"use client";

import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  BookingIncludesUserAndServices,
  useDescendingBookingsForDay,
} from "@/lib/hooks/useBookings";
import { getHMFromDateTime } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import PopoverTextButton from "./PopoverTextButton";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";

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
      {/* {bookings.data?.map((booking) => (
        <Booking key={booking.id} booking={booking} />
      ))} */}
      <DataTable columns={columns} data={bookings.data} />
    </div>
  );
}
