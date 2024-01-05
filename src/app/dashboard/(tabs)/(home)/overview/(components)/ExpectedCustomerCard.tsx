"use client";

import { Users } from "lucide-react";
import OverviewCard from "./StatisticCard";

export default function ExpectedCustomerCard() {
  return (
    <OverviewCard
      subheading="Expecting"
      main="6"
      description="customers"
      Icon={Users}
    ></OverviewCard>
  );
}
