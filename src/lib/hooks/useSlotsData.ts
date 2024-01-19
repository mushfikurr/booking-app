import { Booking, OpeningHour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getBookings, getOpeningHour } from "../query/clientQuery";
import { daysOfWeek } from "../utils";

const useSlotsData = (businessUserId: string, selectedDay: Date) => {
  const openingHoursQuery = useQuery<OpeningHour>(
    ["openingHour", selectedDay.toISOString()],
    async () => {
      const resp = await getOpeningHour(businessUserId, {
        dayOfWeek: daysOfWeek[selectedDay.getDay()],
      });
      return resp;
    }
  );

  const bookingsQuery = useQuery<Booking[]>(
    ["bookings", selectedDay.toISOString()],
    () => getBookings(businessUserId, selectedDay)
  );

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
