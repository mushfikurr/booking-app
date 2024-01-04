import Overview from "@/app/dashboard/(tabs)/(home)/overview/(components)/Overview";
import {
  getBookingsData,
  getOpeningHoursData,
  getUserWithBusinessData,
} from "@/lib/query/serverQuery";
import OpenFromCard from "./(components)/OpenFromCard";
import ExpectedCustomerCard from "./(components)/ExpectedCustomerCard";
import EstimatedRevenueCard from "./(components)/EstimatedRevenueCard";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import OverviewBookings from "./(components)/OverviewBookings";
import { Booking } from "@prisma/client";

export default async function DashboardOverview() {
  const user = await getUserWithBusinessData();
  const businessId = user?.businessUser?.id;
  const bookings = await getBookingsData(businessId);
  const openingHours = await getOpeningHoursData(businessId);

  return (
    <div className="block space-y-6 lg:space-y-0 lg:flex gap-6 h-full">
      <div className="flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <Suspense fallback={<LoadingSkeleton />}>
            <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-8 w-full">
              <OpenFromCard
                prefetchedOpeningHours={openingHours}
                businessId={businessId}
              />
              <ExpectedCustomerCard user={user} />
              <EstimatedRevenueCard user={user} />
            </div>
          </Suspense>
        </div>

        <Suspense fallback={<LoadingSkeleton className="h-full" />}>
          <OverviewBookings
            prefetchedBookingsData={bookings as Booking[]}
            businessUserId={user?.businessUser?.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
