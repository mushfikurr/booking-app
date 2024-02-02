import { Booking, Service, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dateNoTime } from "../utils";

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
    ["bookings", businessUserId, selectedDay.toISOString()],
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

const getUpcomingBooking = async (businessUserId: string, query?: any) => {
  const resp = await axios.post("/api/booking/upcoming", {
    businessUserId,
    ...query,
  });
  return resp.data.upcomingBooking;
};

export const useUpcomingBooking = (
  date: Date,
  businessUserId?: string,
  prefetchedBooking?: BookingIncludesUserAndServices
) => {
  return useQuery<BookingIncludesUserAndServices, Error>(
    ["bookings", businessUserId, "descending"],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided");
      if (!date) throw Error("No date specified");
      const upcomingBooking = await getUpcomingBooking(businessUserId, {
        date,
      });

      return upcomingBooking;
    },
    {
      initialData: prefetchedBooking,
    }
  );
};

const getDescendingBookingsForDay = async (
  businessUserId: string,
  query?: Partial<Booking>
) => {
  const resp = await axios.post("/api/booking/descending", {
    businessUserId,
    query,
  });
  return resp.data.bookings;
};

export const useDescendingBookingsForDay = (
  selectedDate: Date,
  businessUserId?: string,
  prefetchedBookings?: BookingIncludesUserAndServices[]
) => {
  return useQuery<BookingIncludesUserAndServices[], Error>(
    ["bookings", businessUserId, "descending", selectedDate.toISOString()],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided");
      const dateComparator = dateNoTime(selectedDate);
      return await getDescendingBookingsForDay(businessUserId, {
        date: dateComparator,
      });
    },
    {
      initialData: prefetchedBookings,
    }
  );
};

const getCountForUpcomingBookings = async (
  businessUserId: string,
  date?: Date
) => {
  const resp = await axios.post("/api/booking/upcoming/count", {
    businessUserId,
    date,
  });
  return resp.data.count;
};

export const useCountForUpcomingBookings = (
  selectedDate: Date,
  businessUserId?: string,
  prefetchedCount?: number
) => {
  return useQuery<number, Error>(
    ["bookings", "upcoming", "count"],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided");
      const dateComparator = dateNoTime(selectedDate);
      return await getCountForUpcomingBookings(businessUserId, dateComparator);
    },
    {
      initialData: prefetchedCount,
    }
  );
};
