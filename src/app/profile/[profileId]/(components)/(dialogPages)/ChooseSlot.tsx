import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Slot, useSlots } from "@/lib/hooks/useSlots";
import { cn, daysOfWeek, getHMFromDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import { Statistics } from "../Statistics";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { BackButton } from "../BackButton";

export function ChooseDate() {
  const {
    setTitle,
    businessUser,
    services,
    prevPage,
    slot: currentSlot,
    setSlot,
    setCurrentPageState,
  } = useBookingDialogContext();

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    currentSlot?.date ?? today
  );
  const { isLoading, slots, isError, isOpeningHours, currentDayOpeningHours } =
    useSlots({
      businessUserId: businessUser.id,
      selectedServices: services,
      selectedDay,
    });

  setTitle("Choose date and time for your booking");

  let openingHour = getHMFromDateTime(currentDayOpeningHours?.startTime) ?? "";
  let closingHour = getHMFromDateTime(currentDayOpeningHours?.endTime) ?? "";

  const renderSlots = () => {
    if (!slots.length)
      return (
        <Empty className="h-full w-full">
          There aren't any available slots to book.
        </Empty>
      );

    return slots?.map((slot: Slot) => (
      <SelectableSlot
        key={slot.id}
        {...slot}
        handleClick={() => {
          setSlot(slot);
          setSelectedDay(slot.date);
        }}
        currentSlot={currentSlot}
      />
    ));
  };

  const doesCurrentSlotExist = slots.find((o) => o.id === currentSlot?.id);
  const canBookingContinue = currentSlot && doesCurrentSlotExist;

  const handleDone = () => {
    if (canBookingContinue) setCurrentPageState("reviewBooking");
  };

  const renderMainContent = () => {
    if (isLoading) return <LoadingSkeleton />;
    if (isError) return <Empty>There was an error retrieving the slots.</Empty>;
    if (!isOpeningHours)
      return <Empty>This business has not set it's open hours yet.</Empty>;
    const slotOrSlots = slots.length > 1 || slots.length < 1 ? "slots" : "slot";

    return (
      <ScrollableArea>
        <div
          className={cn(
            "flex flex-row gap-6",
            "max-sm:flex-col max-sm:items-center max-sm:gap-6"
          )}
        >
          <Calendar
            className="w-fit h-fit rounded-lg border border-border"
            required
            mode="single"
            disabled={{ before: today }}
            fromMonth={today}
            selected={selectedDay}
            onSelect={setSelectedDay}
          />
          <div className="space-y-2 grow h-full max-sm:w-full">
            <p className="text-sm text-foreground">
              {slots.length} {slotOrSlots} available{" "}
              {openingHour && (
                <span className="font-medium text-foreground">
                  from {openingHour} to {closingHour}
                </span>
              )}
            </p>
            {renderSlots()}
          </div>
        </div>
      </ScrollableArea>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 px-6">{renderMainContent()}</div>
      <BookingDialogFooter services={services}>
        <Button size="lg" onClick={handleDone} disabled={!canBookingContinue}>
          Review booking
        </Button>
      </BookingDialogFooter>
    </div>
  );
}

interface SelectableDateProps {
  className?: string;
  handleClick?: () => void;
  currentSlot?: Slot;
  date?: Date;
  from?: string;
  to?: string;
  id: string;
}

function SelectableSlot({
  className,
  handleClick,
  currentSlot,
  ...thisSlot
}: SelectableDateProps) {
  const [selected, setSelected] = useState(currentSlot?.id === thisSlot.id);

  const onClick = () => {
    if (handleClick) handleClick();
  };

  useEffect(() => {
    if (currentSlot?.date && thisSlot.date) {
      setSelected(currentSlot.id === thisSlot.id);
    }
  }, [currentSlot]);

  const dayFormatted = thisSlot.date ? daysOfWeek[thisSlot.date.getDay()] : "";
  const day = `${thisSlot.date?.getUTCDate()} ${dayFormatted}`;

  return (
    <button
      className={cn(
        "border border-border p-3 rounded-md w-full transition duration-200 ease-in-out",
        {
          "hover:border-secondary-foreground/40": !selected,
          "border-secondary-foreground": selected,
        },
        className
      )}
      onClick={onClick}
    >
      <div className="text-sm text-start">
        <h4 className="">{day}</h4>
        <p className="text-muted-foreground">
          {thisSlot.from} - {thisSlot.to}
        </p>
      </div>
    </button>
  );
}
