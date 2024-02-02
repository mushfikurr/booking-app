import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookingsForBusiness";
import {
  getDescendingBookings,
  getUserWithBusinessData
} from "@/lib/query/serverQuery";
import { BookingView } from "./(components)/BookingView";

export default async function DashboardBookings() {
  const user = await getUserWithBusinessData();
  const now = new Date();
  const bookings = await getDescendingBookings(user?.businessUser?.id);

  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

      <div className="flex flex-col gap-8">
        <BookingView
          businessUserId={user?.businessUser?.id as string}
          prefetchedBookings={bookings as BookingIncludesUserAndServices[]}
        />
      </div>
    </div>
  );
}
