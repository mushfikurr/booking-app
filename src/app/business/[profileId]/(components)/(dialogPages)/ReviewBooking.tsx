"use client";

import { Separator } from "@/components/ui/separator";
import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import { cn, daysOfWeek, getHMFromDateTime } from "@/lib/utils";
import { Service } from "@prisma/client";
import {
  Calendar,
  Clock10,
  LucideIcon,
  PencilRuler,
  PoundSterling,
} from "lucide-react";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import IconButton from "../IconButton";
import { NextButton } from "../NextButton";
import { ServiceCardRoot } from "../ServiceCard";

export function ReviewBooking() {
  const { setTitle, services, slot, setCurrentPageState, submit, isLoading } =
    useBookingDialogContext();
  const { totalCost, totalWait } = useBookingStatistics(services);
  setTitle("Review booking details");

  const dayString = slot ? daysOfWeek[slot.currentDay.getDay()] : "";
  const today = new Date();
  const yearIfDifferent =
    today.getUTCFullYear() === slot?.currentDay.getUTCFullYear()
      ? ""
      : slot?.currentDay.getUTCFullYear();
  const day = yearIfDifferent
    ? `${slot?.currentDay.getUTCDate()} ${dayString} ${yearIfDifferent}`
    : `${slot?.currentDay.getUTCDate()} ${dayString}`;

  const startTimeStr = getHMFromDateTime(slot?.startTime as Date);
  const endTimeStr = getHMFromDateTime(slot?.endTime as Date);
  const formattedDateTime = `${day}, ${startTimeStr} - ${endTimeStr}`;

  const handleEditServices = () => setCurrentPageState("chooseServices");
  const handleEditSlot = () => setCurrentPageState("chooseDate");

  return (
    <>
      <ScrollableArea>
        <div className="flex px-6 gap-6 max-sm:flex-col-reverse">
          <div className="space-y-3 flex-grow">
            <span className="inline-flex justify-between items-center w-full">
              <h2 className="font-medium text-xl">Your services</h2>
              <IconButton Icon={PencilRuler} onClick={handleEditServices}>
                Edit
              </IconButton>
            </span>
            <ServiceList services={services} />
          </div>
          <div className="space-y-3">
            <span className="inline-flex justify-between items-center w-full">
              <h2 className="font-medium text-xl">Booking review</h2>
              <IconButton Icon={PencilRuler} onClick={handleEditSlot}>
                Edit
              </IconButton>
            </span>
            <div className="border-border border rounded-lg h-fit">
              <ReviewEntry
                Icon={Calendar}
                title={"We expect to see you on"}
                value={formattedDateTime}
              />
              <Separator />
              <ReviewEntry Icon={Clock10} title="Set aside" value={totalWait} />
              <Separator />
              <ReviewEntry
                Icon={PoundSterling}
                title="Your services will cost"
                value={totalCost}
              />
            </div>
          </div>
        </div>
      </ScrollableArea>

      <BookingDialogFooter>
        <NextButton
          onClick={submit}
          className="max-sm:px-5"
          isLoading={isLoading}
          nextPage={"reviewBooking"}
        >
          Confirm
        </NextButton>
      </BookingDialogFooter>
    </>
  );
}

interface ReviewEntryProps {
  value: React.ReactNode;
  title: string;
  Icon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

function ReviewEntry({ Icon, children, ...props }: ReviewEntryProps) {
  return (
    <div className="p-5">
      {children}
      <div className={cn("flex gap-6", props.className)}>
        <Icon className="text-muted-foreground h-5 w-5" />
        <span className="space-y-0.5">
          <h2 className="text-muted-foreground leading-none text-sm">
            {props.title}
          </h2>
          <p className="text-base flex items-center">{props.value}</p>
        </span>
      </div>
    </div>
  );
}

function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col gap-3">
      {services.map((service: Service) => (
        <ServiceCardRoot key={service.id} service={service} />
      ))}
    </div>
  );
}
