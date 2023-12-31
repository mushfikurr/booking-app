"use client";

import { getOpeningHoursFromServer } from "@/lib/query/clientQuery";
import { getHMFromDateTime } from "@/lib/utils";
import { OpeningHour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading } = useQuery<OpeningHour[], Error>(
    ["openingHour"],
    async () => {
      if (!businessId) throw Error("No business ID");
      const response = await getOpeningHoursFromServer(businessId);
      return response.openingHours;
    },
    { initialData: prefetchedOpeningHours }
  );

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
    const hour = dateObj.getHours().toString().padStart(2, "0");
    const minute = dateObj.getMinutes().toString().padStart(2, "0");
    const day = dateObj.getDay();

    const newDate = `${weekday[day]}, ${hour}:${minute}`;
    setDate(newDate);
  };

  const currentOpeningHour = Array.isArray(data)
    ? data?.find((obj) => obj.dayOfWeek === date.split(",")[0])
    : undefined;
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
