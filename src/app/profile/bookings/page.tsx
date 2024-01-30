import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { BookingList } from "./(components)/BookingList";

export default async function Bookings() {
  const session = await getServerSession();
  const prefetchedBookings = await db.booking.findMany({
    where: { userId: session?.user?.id },
    orderBy: { startTime: "desc" },
    include: { services: true, businessUser: true },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Bookings</h1>
      <BookingList prefetchedBookings={prefetchedBookings}></BookingList>
    </div>
  );
}
