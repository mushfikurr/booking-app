import { Booking, Service, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBookingsForDay = async (businessUserId: string, currentDay: Date) => {
  const resp = await axios.post("/api/booking", {
    businessUserId,
    date: currentDay,
  });
  return resp.data.bookings;
};

export const useBookingsForDay = (
  selectedDay: Date,
  businessUserId?: string,
  prefetchedBookings?: Booking[]
) => {
  return useQuery<Booking[], Error>(
    ["bookings", selectedDay.toISOString()],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided");
      return await getBookingsForDay(businessUserId, selectedDay);
    },
    {
      initialData: prefetchedBookings,
    }
  );
};

export interface BookingIncludesUser extends Booking {
  user: User;
}

export interface BookingIncludesUserAndServices extends BookingIncludesUser {
  services: Service[];
}

const getDescendingBookings = async (businessUserId: string) => {
  const resp = await axios.post("/api/booking/descending/first", {
    businessUserId,
  });
  return resp.data.bookings;
};

export const useRecentBooking = (
  businessUserId?: string,
  prefetchedBooking?: BookingIncludesUserAndServices
) => {
  return useQuery<BookingIncludesUserAndServices, Error>(
    ["bookings", "descending"],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided");
      return await getDescendingBookings(businessUserId);
    },
    {
      initialData: prefetchedBooking,
    }
  );
};
