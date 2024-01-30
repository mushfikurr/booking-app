import { daysOfWeek } from "../utils";
import { useBookingsForDay } from "./useBookingsForBusiness";
import { useSingleOpeningHours } from "./useOpeningHour";

const useSlotsData = (businessUserId: string, selectedDay: Date) => {
  const selectDay = {
    dayOfWeek: daysOfWeek[selectedDay.getDay()],
  };

  const openingHoursQuery = useSingleOpeningHours(
    selectedDay.getDay(),
    businessUserId,
    undefined
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
