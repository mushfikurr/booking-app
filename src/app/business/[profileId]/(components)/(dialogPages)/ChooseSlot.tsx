import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Calendar } from "@/components/ui/calendar";
import useSlots, { Slot } from "@/lib/hooks/useSlots";
import useSlotsData from "@/lib/hooks/useSlotsData";
import { cn, daysOfWeek, todayNoTime } from "@/lib/utils";
import { Booking, OpeningHour } from "@prisma/client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import IconButton from "../IconButton";
import { NextButton } from "../NextButton";
import { SelectableSlot } from "../SelectableDate";

export default function ChooseSlot() {
  const { setTitle, businessUser, services, slot } = useBookingDialogContext();
  setTitle("Choose a slot in your booking");

  const today = todayNoTime();
  const [selectedDay, setSelectedDay] = useState<Date>(
    slot?.currentDay ?? today
  );
  const slotsData = useSlotsData(businessUser.id, selectedDay);

  const handleDaySelect = (_: Date | undefined, selectedDay: Date) => {
    setSelectedDay(selectedDay);
  };

  return (
    <div className="space-y-8">
      <ScrollableArea className="px-6 w-full">
        <div className="">
          <div
            className={cn("flex gap-6", "max-sm:flex-col max-sm:items-center")}
          >
            <CalendarView
              selectedDay={selectedDay}
              setSelectedDay={handleDaySelect}
            />
            <div className={cn("grow", "max-sm:w-full")}>
              <SlotsView
                bookings={slotsData.bookings}
                openingHour={slotsData.openingHours}
                selectedDay={selectedDay}
                isLoading={slotsData.isLoading}
                isError={slotsData.isError}
                refetchData={slotsData.refetchData}
              />
            </div>
          </div>
        </div>
      </ScrollableArea>
      <BookingDialogFooter services={services}>
        <NextButton nextPage="reviewBooking" disabled={!slot}>
          Review
        </NextButton>
      </BookingDialogFooter>
    </div>
  );
}

interface SlotsViewProps {
  bookings?: Booking[];
  openingHour?: OpeningHour;
  selectedDay: Date;
  isLoading: boolean;
  isError: boolean;
  refetchData: () => void;
}

function SlotsView(props: SlotsViewProps) {
  const { services } = useBookingDialogContext();
  const slots = useSlots(
    props.openingHour,
    props.bookings,
    props.selectedDay,
    services
  );
  const slotOrSlots = `${slots.length} ${
    slots.length === 1 ? "slot" : "slots"
  }`;

  const selectedDay = `${props.selectedDay.getDate()} ${
    daysOfWeek[props.selectedDay.getDay()]
  }`;
  const { slot: currentSlot, setSlot: setCurrentSlot } =
    useBookingDialogContext();

  if (props.isLoading) {
    return <LoadingSkeleton className="h-full w-full" />;
  }

  if (!props.openingHour) {
    return (
      <Empty className="h-full w-full">
        The store is closed for {selectedDay}.
      </Empty>
    );
  }

  if (props.isError) {
    return (
      <Empty className="h-full w-full">
        There was an error retrieving the slots for {selectedDay}.
      </Empty>
    );
  }

  const handleSlotClick = (slot: Slot) => {
    if (slot.slotId === currentSlot?.slotId) {
      setCurrentSlot(undefined);
    } else {
      setCurrentSlot(slot);
    }
  };

  return (
    <div className="space-y-3">
      <span className="inline-flex justify-between items-center w-full">
        <h2 className="text-base">{slotOrSlots} available</h2>
        <IconButton
          Icon={RefreshCw}
          onClick={() => {
            props.refetchData();
          }}
        >
          Refresh
        </IconButton>
      </span>
      <ScrollableArea>
        {slots.map((slot) => (
          <SelectableSlot
            key={slot.slotId}
            thisSlot={slot}
            day={selectedDay}
            onClick={() => handleSlotClick(slot)}
          />
        ))}
      </ScrollableArea>
    </div>
  );
}

interface CalendarViewProps {
  selectedDay: Date;
  setSelectedDay: SelectSingleEventHandler;
}

function CalendarView(props: CalendarViewProps) {
  return (
    <Calendar
      mode="single"
      fromMonth={new Date()}
      selected={props.selectedDay}
      onSelect={props.setSelectedDay}
      className={cn("rounded-md border border-border h-fit", "max-sm:w-fit")}
    />
  );
}
