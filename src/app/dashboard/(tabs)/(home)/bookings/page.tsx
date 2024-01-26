import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookings";
import {
  getDescendingBookings,
  getUserWithBusinessData,
} from "@/lib/query/serverQuery";
import { Suspense } from "react";
import { BookingView } from "./(components)/BookingView";
import { UpcomingBooking } from "./(components)/UpcomingBooking";

export default async function DashboardBookings() {
  const user = await getUserWithBusinessData();
  const now = new Date();
  const bookings = await getDescendingBookings(user?.businessUser?.id);
  const upcomingBookings = bookings?.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);
    return bookingStartTime > now;
  });
  const upcomingBooking =
    upcomingBookings && upcomingBookings.length > 0
      ? upcomingBookings[0]
      : undefined;

  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

      <div className="flex flex-col gap-8">
        <Suspense fallback={<LoadingSkeleton />}>
          {bookings && upcomingBooking && !!bookings.length && (
            <UpcomingBooking
              businessUserId={user?.businessUser?.id as string}
              prefetchedBooking={
                upcomingBooking as BookingIncludesUserAndServices
              }
            />
          )}
        </Suspense>
        <BookingView
          businessUserId={user?.businessUser?.id as string}
          prefetchedBookings={bookings as BookingIncludesUserAndServices[]}
        />
      </div>
    </div>
  );
}
