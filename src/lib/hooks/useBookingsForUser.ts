import { Booking, BusinessUser, Service, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBookings = async (userId: string) => {
  const resp = await axios.post("/api/booking/includes", {
    query: { userId },
    include: { services: true, businessUser: true },
  });
  return resp.data.bookings;
};

export interface BookingIncludesServicesAndBusiness extends Booking {
  services: Service[];
  businessUser: BusinessUser;
}

export const useBookingsForUser = (
  userId?: string,
  prefetchedBookings?: BookingIncludesServicesAndBusiness[]
) => {
  return useQuery<BookingIncludesServicesAndBusiness[], Error>(
    ["bookings", userId],
    async () => {
      if (!userId) throw Error("No user ID provided");
      return await getBookings(userId);
    },
    {
      initialData: prefetchedBookings,
    }
  );
};
