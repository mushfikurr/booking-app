"use client";

import { useBookingsForDay } from "@/lib/hooks/useBookingsForBusiness";
import { todayNoTime } from "@/lib/utils";
import { Booking } from "@prisma/client";
import axios from "axios";
import Link from "next/link";

const getBookings = async (businessUserId: string | undefined) => {
  const resp = await axios.post("/api/booking", { businessUserId });
  return resp.data;
};

export default function OverviewBookings({
  prefetchedBookingsData,
  businessUserId,
}: {
  prefetchedBookingsData: Booking[];
  businessUserId: string | undefined;
}) {
  const { data, isLoading } = useBookingsForDay(
    todayNoTime(),
    businessUserId,
    prefetchedBookingsData
  );

  if (data?.length === 0) return <EmptyOverviewBookings />;

  return (
    <div className="border border-border rounded-lg p-6 flex flex-col text-center items-center justify-center space-y-3">
      <p className="text-2xl animate-in fade-in slide-in-from-bottom-8 ease-in-out duration-500">
        🚀
      </p>
      <div className="animate-in fade-in slide-in-from-bottom-4 ease-in-out duration-300">
        <h2 className="font-medium text-md">Coming soon</h2>
        <p className="text-muted-foreground max-w-prose text-sm">
          Graph View, a new way to visualise your bookings.
        </p>
      </div>
    </div>
  );
}

export function EmptyOverviewBookings() {
  return (
    <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="flex flex-col items-center justify-center bg-muted rounded-lg border border-border drop-shadow-sm p-32 space-y-1 text-center">
        <h3 className="text-muted-foreground font-semibold text-xl tracking-tight">
          No bookings today.
        </h3>
        <p className="text-muted-foreground text-sm tracking-wide leading-tight">
          Ensure you have{" "}
          <Link href="/dashboard/services" className="font-semibold">
            services
          </Link>{" "}
          and{" "}
          <Link
            href="/dashboard/editProfile/openinghours"
            className="font-semibold"
          >
            opening hours
          </Link>{" "}
          set up.
        </p>
      </div>
    </div>
  );
}
