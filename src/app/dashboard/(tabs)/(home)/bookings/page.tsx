import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookings";
import {
  getDescendingBookings,
  getUserWithBusinessData,
} from "@/lib/query/serverQuery";
import { UpcomingBooking } from "./(components)/UpcomingBooking";

export default async function DashboardBookings() {
  const user = await getUserWithBusinessData();
  const bookings = await getDescendingBookings(user?.businessUser?.id);

  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

      {bookings && !!bookings.length && (
        <UpcomingBooking
          prefetchedBooking={bookings[0] as BookingIncludesUserAndServices}
        />
      )}
    </div>
  );
}
