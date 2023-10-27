"use client";

import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";

interface OpenFromCardProps {
  user?: UserWithBusinessUser;
}

export default function OpenFromCard({ user }: OpenFromCardProps) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [date, setDate] = useState<string>("");

  const updateDate = () => {
    const dateObj = new Date();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const day = dateObj.getDay();

    const newDate = `${weekday[day]}, ${hour}:${minute}`;
    setDate(newDate);
  };

  useEffect(() => {
    const interval = setInterval(updateDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <OverviewCard
      subheading="Open from"
      main={"09:00-17:00"}
      description={date}
      Icon={Clock}
    ></OverviewCard>
  );
}
