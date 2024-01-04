"use client";

import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Coins } from "lucide-react";
import OverviewCard from "./StatisticCard";

interface EstimatedRevenueCardProps {
  user?: UserWithBusinessUser;
}

export default function EstimatedRevenueCard({
  user,
}: EstimatedRevenueCardProps) {
  return (
    <OverviewCard
      subheading="Estimated"
      main="£350"
      description="in revenue"
      Icon={Coins}
    ></OverviewCard>
  );
}
