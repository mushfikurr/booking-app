import ClipboardCopyButton from "@/components/ClipboardCopyButton";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookingsForBusiness";
import {
  getBookingsData,
  getOpeningHoursData,
  getUpcomingBooking,
  getUserWithBusinessData,
} from "@/lib/query/serverQuery";
import { todayNoTime } from "@/lib/utils";
import { Booking } from "@prisma/client";
import { ClipboardCopy } from "lucide-react";
import { Suspense } from "react";
import { UpcomingBooking } from "./(components)/UpcomingBooking";
import EstimatedRevenueCard from "./(components)/EstimatedRevenueCard";
import ExpectedCustomerCard from "./(components)/ExpectedCustomerCard";
import OpenFromCard from "./(components)/OpenFromCard";
import OverviewBookings from "./(components)/OverviewBookings";

export default async function DashboardOverview() {
  const user = await getUserWithBusinessData();
  const businessId = user?.businessUser?.id;
  const bookings = await getBookingsData(businessId);
  const openingHours = await getOpeningHoursData(businessId);
  const upcomingBooking = await getUpcomingBooking(businessId, todayNoTime());

  return (
    <div className="block space-y-6 lg:space-y-0 lg:flex gap-6">
      <div className="flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-4">
          <div className="w-full items-center inline-flex justify-between gap-2">
            <span className="inline-flex gap-1.5 items-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Overview
              </h1>
              <div className="text-muted-foreground text-2xl font-medium tracking-tight">
                / {user?.businessUser?.businessDisplayName}
              </div>
            </span>
            <ClipboardCopyButton
              className="gap-2 text-xs"
              variant="outline"
              size="sm"
              link={`business/${user?.businessUser?.profileId}`}
              toastTitle="Copied profile link to clipboard"
              toastDescription="Share this with customers, allowing them to create bookings."
            >
              <ClipboardCopy className="h-4 w-4" />
              Copy profile link
            </ClipboardCopyButton>
          </div>
          <Suspense fallback={<LoadingSkeleton className="grow" />}>
            {upcomingBooking && (
              <UpcomingBooking
                prefetchedBooking={
                  upcomingBooking as BookingIncludesUserAndServices
                }
                businessUserId={user?.businessUser?.id}
              />
            )}
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-8 w-full">
              <OpenFromCard
                prefetchedOpeningHours={openingHours}
                businessId={businessId}
              />
              <ExpectedCustomerCard businessUserId={businessId} />
              <EstimatedRevenueCard businessUserId={businessId} />
            </div>
          </Suspense>
        </div>

        <Suspense fallback={<LoadingSkeleton className="grow" />}>
          <OverviewBookings
            prefetchedBookingsData={bookings as Booking[]}
            businessUserId={user?.businessUser?.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
