"use client";

import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/ui/data-table";
import {
  BookingIncludesUserAndServices,
  useDescendingBookingsForDay,
} from "@/lib/hooks/useBookingsForBusiness";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { columns } from "./Columns";
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

  const handleChevronClick = (direction: "left" | "right") => {
    if (selectedDate) {
      const directionAsNumber = direction === "left" ? -1 : 1;
      setSelectedDate(
        new Date(
          selectedDate.setDate(selectedDate.getDate() + directionAsNumber)
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <PopoverTextButton displayContent={displayCalendar()} className="w-fit">
          {selectedDayDisplayString}
        </PopoverTextButton>
        <span className="inline-flex gap-2 items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              handleChevronClick("left");
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              handleChevronClick("right");
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </span>
      </div>

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

  if (!bookings.data?.length) {
    return (
      <Empty className="grow h-full">
        There are no bookings for the selected date.
      </Empty>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={bookings.data}
      descFirst={true}
      isLoading={bookings.isFetching}
    />
  );
}
