"use client";

import { Coins } from "lucide-react";
import OverviewCard from "./StatisticCard";

export default function EstimatedRevenueCard() {
  return (
    <OverviewCard
      subheading="Estimated"
      main="£350"
      description="in revenue"
      Icon={Coins}
    ></OverviewCard>
  );
}
