"use client";

import { Users } from "lucide-react";
import OverviewCard from "./StatisticCard";
import { useCountForUpcomingBookings } from "@/lib/hooks/useBookingsForBusiness";
import { todayNoTime } from "@/lib/utils";

interface ExpectedCustomerCardProps {
  businessUserId?: string;
}
export default function ExpectedCustomerCard({
  ...props
}: ExpectedCustomerCardProps) {
  const today = todayNoTime();
  const expectedCustomers = useCountForUpcomingBookings(
    today,
    props.businessUserId
  );

  return (
    <OverviewCard
      subheading="Expecting"
      main={expectedCustomers.data ?? "0"}
      description="customers today"
      Icon={Users}
      isLoading={expectedCustomers.isLoading}
      isRefetching={expectedCustomers.isFetching}
    />
  );
}
