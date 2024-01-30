"use client";

import {
  useOpeningHours,
  useSingleOpeningHours,
} from "@/lib/hooks/useOpeningHour";
import { daysOfWeek, getHMFromDateTime } from "@/lib/utils";
import { OpeningHour } from "@prisma/client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import OverviewCard from "./StatisticCard";

interface OpenFromCardProps {
  prefetchedOpeningHours?: OpeningHour[];
  businessId: string | undefined;
}

export default function OpenFromCard({
  prefetchedOpeningHours,
  businessId,
}: OpenFromCardProps) {
  const today = new Date();
  const todaysString = daysOfWeek[today.getDay()];
  const prefetchedOpeningHour = prefetchedOpeningHours?.find(
    (o: OpeningHour) => o.dayOfWeek === todaysString
  );
  const { data, isLoading } = useSingleOpeningHours(
    today.getDay(),
    businessId,
    prefetchedOpeningHour
  );

  const dateToDDHHMM = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${todaysString}, ${hour}:${minute}`;
  };

  const currentOpeningHour = data;
  const [date, setDate] = useState<string>(dateToDDHHMM(today));

  const updateDate = () => {
    const now = new Date();
    const newDate = dateToDDHHMM(now);
    setDate(newDate);
  };

  const displayedTime = () => {
    if (currentOpeningHour?.startTime && currentOpeningHour?.endTime) {
      const formattedStartTime = getHMFromDateTime(
        currentOpeningHour.startTime
      );
      const formattedEndTime = getHMFromDateTime(currentOpeningHour.endTime);

      return `${formattedStartTime} - ${formattedEndTime}`;
    }
    return "No time set";
  };

  useEffect(() => {
    const interval = setInterval(updateDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updateDate]);

  return (
    <OverviewCard
      subheading="Open from"
      main={displayedTime()}
      description={date}
      Icon={Clock}
      isLoading={isLoading}
    ></OverviewCard>
  );
}
