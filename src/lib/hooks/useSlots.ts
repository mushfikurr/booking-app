import { OpeningHour, Service } from "@prisma/client";
import { getOpeningHoursFromServer } from "../clientQuery";
import { useQuery } from "@tanstack/react-query";
import { daysOfWeek } from "../utils";

interface UseSlotsArgs {
  businessUserId: string;
  selectedServices: Service[];
  selectedDay: Date | undefined;
}
export interface Slot {
  id: string;
  date: Date;
  from: string;
  to: string;
}

export function useSlots({
  businessUserId,
  selectedServices,
  selectedDay,
}: UseSlotsArgs) {
  if (!selectedDay) {
    return {
      slots: [],
      isLoading: false,
      isOpeningHours: false,
      isError: false,
    };
  }

  const { data, isLoading, isError } = useQuery(["openingHour"], async () => {
    return await getOpeningHoursFromServer(businessUserId);
  });
  const openingHours = data?.openingHours;

  const serviceWaitTimeInSecs = selectedServices.reduce(
    (i, service) => i + service.estimatedTime,
    0
  );

  const dayString = daysOfWeek[selectedDay.getDay()];
  const currentDayOpeningHours =
    openingHours?.length &&
    openingHours?.find((o: OpeningHour) => o.dayOfWeek === dayString);

  const openingTime = new Date(currentDayOpeningHours?.startTime);
  const closingTime = new Date(currentDayOpeningHours?.endTime);
  const slotDurationInMs = serviceWaitTimeInSecs * 1000;

  const slots = calculateSlots({
    currentDay: selectedDay,
    openingTime,
    closingTime,
    slotDuration: slotDurationInMs,
  });

  return {
    slots,
    isLoading,
    isOpeningHours: openingHours?.length,
    currentDayOpeningHours,
    isError,
  };
}

function calculateSlots({
  currentDay,
  openingTime,
  closingTime,
  slotDuration,
}: {
  currentDay: Date;
  openingTime: Date;
  closingTime: Date;
  slotDuration: number;
}) {
  const slots = [];
  let currentTime = openingTime;

  while (currentTime < closingTime) {
    const endTime = new Date(currentTime.getTime() + slotDuration);

    if (endTime > closingTime) {
      endTime.setTime(closingTime.getTime());
    }

    const id = `${currentDay.getTime()}-${currentTime.getTime()}-${endTime.getTime()}`;

    slots.push({
      id,
      date: currentDay,
      from:
        currentTime.getHours() +
        ":" +
        (currentTime.getMinutes() < 10 ? "0" : "") +
        currentTime.getMinutes(),
      to:
        endTime.getHours() +
        ":" +
        (endTime.getMinutes() < 10 ? "0" : "") +
        endTime.getMinutes(),
    });

    currentTime = endTime;
  }

  // TODO: filter bookings

  return slots;
}
