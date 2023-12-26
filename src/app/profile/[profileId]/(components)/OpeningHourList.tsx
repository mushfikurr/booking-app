import { CollapsibleCard } from "@/components/CollapsibleCard";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";

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
    { day: "Monday", startTime: "9:00", endTime: "5:00" },
    { day: "Tuesday" },
    { day: "Thursday", startTime: "9:00", endTime: "17:00" },
    { day: "Friday", startTime: "9:00", endTime: "17:00" },
    { day: "Saturday", startTime: "10:00", endTime: "15:00" },
    { day: "Sunday", startTime: "12:00", endTime: "16:00" },
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

function OpeningHour({ day, startTime, endTime }: Readonly<OpeningHourProps>) {
  const today = daysOfWeek[new Date().getDay()];
  const isToday = today === day;
  const hourRange =
    !startTime || !endTime ? "Closed" : `${startTime} - ${endTime}`;

  return (
    <div className="flex justify-between items-center text-sm gap-2">
      <span className="inline-flex items-center gap-1">
        <ChevronsRight
          className={cn({
            "hidden text-foreground h-4 w-4": true,
            block: isToday,
          })}
        />
        <p
          className={cn({
            "text-foreground/80": true,
            "text-foreground": isToday,
          })}
        >
          {day}
        </p>
      </span>
      <p
        className={cn({
          "text-muted-foreground": true,
          "text-foreground": isToday,
        })}
      >
        {hourRange}
      </p>
    </div>
  );
}
