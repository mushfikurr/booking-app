"use client";

import { Button } from "@/components/ui/button";
import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import { daysOfWeek } from "@/lib/utils";
import { Service } from "@prisma/client";
import {
  Calendar,
  Clock11,
  LucideIcon,
  Pencil,
  PoundSterling,
} from "lucide-react";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import IconButton from "../IconButton";
import { ServiceCardRoot } from "../ServiceCard";

export function ReviewBooking() {
  const { setTitle, services, slot, setCurrentPageState } =
    useBookingDialogContext();
  const { totalCost, totalWait } = useBookingStatistics(services);
  setTitle("Review booking details");

  const dayString = slot ? daysOfWeek[slot.date.getDay()] : "";
  const today = new Date();
  const yearIfDifferent =
    today.getUTCFullYear() === slot?.date.getUTCFullYear()
      ? ""
      : slot?.date.getUTCFullYear();
  const day = yearIfDifferent
    ? `${slot?.date.getUTCDate()} ${dayString} ${yearIfDifferent}`
    : `${slot?.date.getUTCDate()} ${dayString}`;
  const formattedDateTime = `${day}, ${slot?.from} - ${slot?.to}`;

  const handleEditServices = () => setCurrentPageState("chooseServices");

  return (
    <>
      <ScrollableArea>
        <div className="flex px-6 gap-6 max-sm:flex-col-reverse">
          <div className="space-y-3 flex-grow">
            <span className="inline-flex justify-between items-center w-full">
              <h2 className="font-medium">Booked services</h2>
              <IconButton Icon={Pencil} onClick={handleEditServices}>
                Edit services
              </IconButton>
            </span>
            <ServiceList services={services} />
          </div>
          <div className="space-y-5 bg-primary text-primary-foreground rounded-lg p-6">
            <ReviewEntry
              Icon={Calendar}
              title={"We expect to see you on"}
              value={formattedDateTime}
            />
            <ReviewEntry
              Icon={PoundSterling}
              title="Your services will cost"
              value={totalCost}
            />
            <ReviewEntry Icon={Clock11} title="Set aside" value={totalWait} />
          </div>
        </div>
      </ScrollableArea>

      <BookingDialogFooter>
        <div className="flex flex-wrap items-center justify-end">
          <Button size="lg">Confirm</Button>
        </div>
      </BookingDialogFooter>
    </>
  );
}

interface ReviewEntryProps {
  value: string;
  title: string;
  Icon: LucideIcon;
}

function ReviewEntry({ Icon, ...props }: ReviewEntryProps) {
  return (
    <div className="flex gap-4">
      <Icon className="text-primary-foreground/80" />
      <span className="space-y-0.5">
        <h2 className="text-primary-foreground/80 leading-none text-sm">
          {props.title}
        </h2>
        <p className="text-lg flex items-center font-medium max-sm:text-base">
          {props.value}
        </p>
      </span>
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
