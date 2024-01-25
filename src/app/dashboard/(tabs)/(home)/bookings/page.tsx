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
  const bookings = await getDescendingBookings(user?.businessUser?.id);
  const upcomingBookings = bookings?.filter((booking) => {
    return booking.startTime > new Date();
  });
  const upcomingBooking = upcomingBookings
    ? upcomingBookings[upcomingBookings.length - 1]
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
