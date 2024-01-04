import { getBookingsData, getOpeningHoursData } from "@/lib/query/serverQuery";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Booking } from "@prisma/client";
import { Suspense } from "react";
import EstimatedRevenueCard from "./EstimatedRevenueCard";
import ExpectedCustomerCard from "./ExpectedCustomerCard";
import OpenFromCard from "./OpenFromCard";
import OverviewBookings from "./OverviewBookings";

export default async function Overview({
  user,
}: {
  user?: UserWithBusinessUser | null;
}) {
  const businessId = user?.businessUser?.id;
  const bookings = await getBookingsData(businessId);
  const openingHours = await getOpeningHoursData(businessId);

  return (
    <div className="block space-y-6 lg:space-y-0 lg:flex gap-6 h-full">
      <div className="flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-8 w-full">
            <OpenFromCard
              prefetchedOpeningHours={openingHours}
              businessId={businessId}
            />
            <ExpectedCustomerCard user={user} />
            <EstimatedRevenueCard user={user} />
          </div>
        </div>

        <Suspense>
          <OverviewBookings
            prefetchedBookingsData={bookings as Booking[]}
            businessUserId={user?.businessUser?.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
