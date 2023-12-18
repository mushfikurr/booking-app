import { CollapsibleCard } from "@/components/CollapsibleCard";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronsRight } from "lucide-react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function OpeningHourList() {
  const days: OpeningHourProps[] = [
    { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { day: "Tuesday" },
    { day: "Wednesday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { day: "Thursday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { day: "Friday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { day: "Saturday", startTime: "10:00 AM", endTime: "3:00 PM" },
    { day: "Sunday", startTime: "12:00 PM", endTime: "4:00 PM" },
  ];

  return (
    <CollapsibleCard title="Opening Hours">
      <div className="flex flex-col gap-1 text-sm">
        {days.map((day) => (
          <OpeningHour key={day} {...day} />
        ))}
      </div>
    </CollapsibleCard>
  );
}

interface OpeningHourProps {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime?: string;
  endTime?: string;
}

function OpeningHour({ day, startTime, endTime }: OpeningHourProps) {
  const today = daysOfWeek[new Date().getDay()];
  const isToday = today === day;
  const hourRange =
    !startTime || !endTime ? "Closed" : `${startTime} - ${endTime}`;

  return (
    <div className="flex justify-between items-center text-sm gap-2">
      <span className="inline-flex items-center gap-1">
        <ChevronsRight
          className={cn("hidden text-muted-foreground h-4 w-4", {
            block: isToday,
          })}
        />
        <p>{day}</p>
      </span>
      <p className="text-foreground/80">{hourRange}</p>
    </div>
  );
}
