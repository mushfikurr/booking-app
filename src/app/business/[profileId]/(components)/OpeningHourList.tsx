import { CollapsibleCard } from "@/components/CollapsibleCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { getOpeningHoursData } from "@/lib/query/serverQuery";
import { Day, cn, daysOfWeek, getHMFromDateTime } from "@/lib/utils";
import { BusinessUser } from "@prisma/client";
import { ChevronsRight } from "lucide-react";
import { Suspense } from "react";

export async function OpeningHourList({
  businessUser,
}: {
  businessUser: BusinessUser;
}) {
  const days = await getOpeningHoursData(businessUser.id);

  const renderOpeningHours = () => {
    if (!days || !days.length) {
      return (
        <>
          <h3 className="font-medium">No opening hours provided</h3>
          <p className="text-muted-foreground">
            If you are the business owner, consider setting opening hours for
            your business.
          </p>
        </>
      );
    } else {
      return days?.map((day) => (
        <OpeningHour
          key={day.dayOfWeek}
          day={day.dayOfWeek as Day}
          startTime={getHMFromDateTime(day.startTime)}
          endTime={getHMFromDateTime(day.endTime)}
        />
      ));
    }
  };

  return (
    <CollapsibleCard title="Opening Hours">
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="flex flex-col gap-1 text-sm">
          {renderOpeningHours()}
        </div>
      </Suspense>
    </CollapsibleCard>
  );
}

interface OpeningHourProps {
  day: Day;
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
