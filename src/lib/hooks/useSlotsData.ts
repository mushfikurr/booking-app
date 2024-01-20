import { Booking, OpeningHour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getBookings, getOpeningHour } from "../query/clientQuery";
import { daysOfWeek } from "../utils";
import { useServices } from "./useServices";
import { useOpeningHours } from "./useOpeningHour";
import { useBookingsForDay } from "./useBookings";

const useSlotsData = (businessUserId: string, selectedDay: Date) => {
  const selectDay = {
    dayOfWeek: daysOfWeek[selectedDay.getDay()],
  };

  const openingHoursQuery = useOpeningHours(
    businessUserId,
    undefined,
    selectDay
  );

  const bookingsQuery = useBookingsForDay(selectedDay, businessUserId);

  const refetchData = () => {
    openingHoursQuery.refetch();
    bookingsQuery.refetch();
  };

  return {
    openingHours: openingHoursQuery.data,
    bookings: bookingsQuery.data,
    isLoading: openingHoursQuery.isFetching || bookingsQuery.isFetching,
    isError: openingHoursQuery.isError || bookingsQuery.isError,
    refetchData,
  };
};

export default useSlotsData;
