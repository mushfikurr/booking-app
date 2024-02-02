"use client";

import { useDescendingBookingsForDay } from "@/lib/hooks/useBookingsForBusiness";
import { todayNoTime } from "@/lib/utils";
import { Coins } from "lucide-react";
import OverviewCard from "./StatisticCard";

interface EstimatedRevenueCardProps {
  businessUserId?: string;
}

export default function EstimatedRevenueCard({
  ...props
}: EstimatedRevenueCardProps) {
  const bookingsForDay = useDescendingBookingsForDay(
    todayNoTime(),
    props.businessUserId
  );
  let totalAmount = 0;
  if (bookingsForDay.data) {
    for (const booking of bookingsForDay.data) {
      const serviceTotal = booking.services.reduce(
        (prevVal, s) => prevVal + parseFloat(s.price),
        0
      );
      totalAmount += serviceTotal;
    }
  }

  return (
    <OverviewCard
      subheading="Estimated"
      main={`£${totalAmount}`}
      description="in revenue"
      Icon={Coins}
    ></OverviewCard>
  );
}
