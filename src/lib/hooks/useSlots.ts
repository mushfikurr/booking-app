// useSlots.ts
import { useMemo } from "react";
import { Booking, OpeningHour, Service } from "@prisma/client";

export interface Slot {
  slotId: string;
  currentDay: Date;
  startTime: Date;
  endTime: Date;
}

const generateSlotId = (
  currentDay: Date,
  startTime: Date,
  endTime: Date
): string => {
  return `${currentDay.toISOString()}-${startTime.toISOString()}-${endTime.toISOString()}`;
};

const useSlots = (
  openingHour: OpeningHour | undefined,
  bookings: Booking[] | undefined,
  currentDay: Date,
  services: Service[]
): Slot[] => {
  return useMemo(() => {
    if (!openingHour) {
      return [];
    }

    const calculateServiceDuration = () => {
      return services.reduce(
        (sum: number, newVal: Service) => sum + newVal.estimatedTime,
        0
      );
    };
    const serviceDuration = calculateServiceDuration() / 60;

    const slots: Slot[] = [];
    let start = new Date(openingHour.startTime);
    start = applyDateOnly(start, currentDay);

    let end = new Date(openingHour.endTime);
    end = applyDateOnly(end, currentDay);

    while (start <= end) {
      const startTime = new Date(start);
      const endTime = new Date(start);

      endTime.setMinutes(endTime.getMinutes() + serviceDuration);

      if (endTime <= end && !bookings?.some(isSlotBooked(startTime, endTime))) {
        const slotId = generateSlotId(currentDay, startTime, endTime);
        slots.push({ slotId, currentDay, startTime, endTime });
      }

      start.setMinutes(start.getMinutes() + serviceDuration);
    }

    return slots;
  }, [openingHour, bookings, currentDay, services]);
};

const applyDateOnly = (date1: Date, date2: Date) => {
  date1.setDate(date2.getDate());
  date1.setMonth(date2.getMonth());
  date1.setFullYear(date2.getFullYear());

  return date1;
};

const isSlotBooked = (startTime: Date, endTime: Date) => (booking: Booking) => {
  const bookingDate = new Date(booking.date);
  const bookingStartTime = new Date(booking.startTime);
  const bookingEndTime = new Date(booking.endTime);
  const getOnlyDateISOString = (date: Date) =>
    date.toISOString().substring(0, 11); // Retrieve only the date (comparing date only)

  // Compare booking to slot with conditions that will deemed if a slot is taken.
  const bookedPredicate =
    getOnlyDateISOString(bookingDate) === getOnlyDateISOString(startTime) &&
    bookingEndTime.getTime() > startTime.getTime() &&
    bookingStartTime.getTime() < endTime.getTime();
  return bookedPredicate;
};

export default useSlots;
