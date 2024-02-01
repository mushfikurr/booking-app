"use client";

import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Booking } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading } = useQuery(
    ["bookings"],
    async () => {
      return await getBookings(businessUserId);
    },
    { initialData: prefetchedBookingsData }
  );

  if (isLoading) return <LoadingSkeleton className="h-full" />;

  if (data?.bookings?.length === 0) {
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
}
