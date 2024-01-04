"use client";

import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Users } from "lucide-react";
import OverviewCard from "./StatisticCard";

interface ExpectedCustomerCardProps {
  user?: UserWithBusinessUser;
}

export default function ExpectedCustomerCard({
  user,
}: ExpectedCustomerCardProps) {
  return (
    <OverviewCard
      subheading="Expecting"
      main="6"
      description="customers"
      Icon={Users}
    ></OverviewCard>
  );
}
