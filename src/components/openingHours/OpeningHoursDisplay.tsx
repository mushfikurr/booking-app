"use client";

import { getOpeningHoursFromClient, newOpeningHour } from "@/lib/clientQuery";
import { TimeRangeSchema } from "@/lib/form/time-range-schema";
import { cn, getTimeFromDatetime } from "@/lib/utils";
import { OpeningHour } from "@prisma/client";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Check, DoorClosed, DoorOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Toggle } from "../ui/toggle";
import { toast } from "../ui/use-toast";

enum DAYS_OF_WEEK {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

function TimeRange({
  weekState,
  updateTime,
  day,
  mutateOpenHour,
}: {
  day: DAYS_OF_WEEK;
  weekState: WeekSchedule;
  updateTime: (dayOfWeek: DAYS_OF_WEEK, key: string, time: string) => void;
  mutateOpenHour: UseMutationResult<OpeningHour, Error, DayMutation, unknown>;
}) {
  const { isOpen, toTime, fromTime } = weekState[day];
  const [errorState, setErrorState] = useState<(string | ZodError<any>)[]>([]);

  const handleSchemaErrors = (err: ZodError) => {
    setErrorState([]);
    const zodErrors = err.flatten().fieldErrors;
    for (const key in zodErrors) {
      if (zodErrors.hasOwnProperty(key)) {
        const errors = zodErrors[key];
        if (errors) {
          for (const zodError of errors) {
            setErrorState((prevValues) => [...prevValues, zodError]);
          }
        }
      }
    }
  };

  const onSubmit = async () => {
    const valuesToBeParsed = { from: fromTime, to: toTime };
    TimeRangeSchema.parseAsync(valuesToBeParsed)
      .then(async () => {
        await mutateOpenHour.mutateAsync({
          isOpen,
          toTime,
          fromTime,
          dayOfWeek: day,
        });
        console.log("OK");
      })
      .catch((err) => {
        handleSchemaErrors(err);
      });
  };

  const prevFromValueRef = useRef(fromTime);
  const prevToValueRef = useRef(toTime);

  useEffect(() => {
    if (
      fromTime !== prevFromValueRef.current ||
      toTime !== prevToValueRef.current
    ) {
      setErrorState([]);
    }

    prevFromValueRef.current = fromTime;
    prevToValueRef.current = toTime;
  }, [fromTime, toTime]);

  useEffect(() => {
    if (errorState.length !== 0) {
      toast({
        title: "Error changing opening hour",
        description: errorState[0] as string,
        variant: "destructive",
      });
    }
  }, [errorState]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-3">
          <div className="flex gap-2 items-center group">
            <Label
              htmlFor="from"
              className={cn(
                "text-foreground font-normal",
                !isOpen && "text-muted-foreground"
              )}
            >
              From
            </Label>
            <Input
              className="h-full w-16"
              id="from"
              disabled={!isOpen}
              value={fromTime}
              onChange={(e) => {
                updateTime(day, "fromTime", e.target.value);
              }}
            ></Input>
          </div>
          <div className="flex gap-2 items-center group">
            <Label
              htmlFor="from"
              className={cn(
                "text-foreground font-normal",
                !isOpen && "text-muted-foreground"
              )}
            >
              To
            </Label>
            <Input
              className="h-full w-16"
              id="to"
              disabled={!isOpen}
              value={toTime}
              onChange={(e) => {
                updateTime(day, "toTime", e.target.value);
              }}
            ></Input>
          </div>
        </div>
        {isOpen && (
          <div
            className={cn(
              "text-destructive text-sm py-3",
              errorState.length === 0 && "hidden"
            )}
          >
            {errorState.map((err, i) => (
              <p key={i}>{err as string}</p>
            ))}
          </div>
        )}
      </div>

      <Button
        className={cn(
          "h-full py-2 hidden",
          isOpen &&
            "block animate-in slide-in-from-left-4 fade-in duration-300 ease-in-out z-0"
        )}
        onClick={onSubmit}
        variant="outline"
        disabled={!isOpen}
      >
        <Check className="h-4 w-4" />
      </Button>
    </>
  );
}

function OpeningHoursForDay({
  day,
  weekState,
  openDay,
  isLoading,
  updateTime,
  mutateOpenHour,
}: {
  day: DAYS_OF_WEEK;
  weekState: WeekSchedule;
  openDay: (dayOfWeek: DAYS_OF_WEEK, open: boolean) => void;
  isLoading: boolean;
  updateTime: (dayOfWeek: DAYS_OF_WEEK, key: string, time: string) => void;
  mutateOpenHour: UseMutationResult<OpeningHour, Error, DayMutation, unknown>;
}) {
  const { isOpen } = weekState[day];
  return (
    <div className="flex items-center gap-3">
      <Toggle
        onPressedChange={(pressed) => {
          openDay(day, pressed);
        }}
        pressed={isOpen}
        className="text-muted-foreground hover:text-foreground"
      >
        {!isOpen ? (
          <DoorClosed className="h-6 w-6" />
        ) : (
          <DoorOpen className="h-6 w-6 transition duration-200 ease-in-out" />
        )}
      </Toggle>
      <div
        key={day}
        className={cn(
          "p-3 border border-border rounded-md flex items-center justify-between w-full transition duration-200 ease-in-out",
          !isOpen && "bg-muted"
        )}
      >
        {mutateOpenHour.isLoading && "loading..."}
        <div
          className={cn(
            "flex gap-3 w-full",
            !isOpen && "text-muted-foreground"
          )}
        >
          <div className="flex items-center justify-between gap-5 w-full">
            <div>
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                {isOpen ? "Open" : "Closed"}
              </p>
              <h3 className="text-md">{day}</h3>
            </div>
            <div className="flex gap-5 items-center">
              <div className="flex gap-4">
                {weekState && (
                  <TimeRange
                    day={day}
                    weekState={weekState}
                    updateTime={updateTime}
                    mutateOpenHour={mutateOpenHour}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

interface DayInfo {
  isOpen: boolean;
  fromTime: string;
  toTime: string;
}

interface DayMutation extends DayInfo {
  dayOfWeek: DAYS_OF_WEEK;
}

interface WeekSchedule {
  [DAYS_OF_WEEK.MONDAY]: DayInfo;
  [DAYS_OF_WEEK.TUESDAY]: DayInfo;
  [DAYS_OF_WEEK.WEDNESDAY]: DayInfo;
  [DAYS_OF_WEEK.THURSDAY]: DayInfo;
  [DAYS_OF_WEEK.FRIDAY]: DayInfo;
  [DAYS_OF_WEEK.SATURDAY]: DayInfo;
  [DAYS_OF_WEEK.SUNDAY]: DayInfo;
}

export default function OpeningHoursDisplay({
  openingHours,
  businessId,
}: {
  openingHours: OpeningHour[] | undefined;
  businessId: string | undefined;
}) {
  const [weekState, setWeekState] = useState<WeekSchedule>({
    [DAYS_OF_WEEK.MONDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.TUESDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.WEDNESDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.THURSDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.FRIDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.SATURDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
    [DAYS_OF_WEEK.SUNDAY]: {
      isOpen: false,
      fromTime: "09:00",
      toTime: "15:00",
    },
  });

  const { data, isLoading, refetch } = useQuery(
    ["openingHour"],
    async () => {
      if (businessId) {
        return await getOpeningHoursFromClient(businessId);
      }
    },
    { initialData: openingHours }
  );

  const mutateOpenHour = useMutation<OpeningHour, Error, DayMutation>(
    ["openingHour"],
    async (mutationData) => {
      const { fromTime, toTime, dayOfWeek } = mutationData;
      if (businessId) {
        return await newOpeningHour(businessId, dayOfWeek, {
          from: fromTime,
          to: toTime,
        });
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  useEffect(() => {
    if (data.openingHours && data.openingHours.length > 0) {
      for (const openingHour of data.openingHours) {
        const toTime = getTimeFromDatetime(openingHour.startTime);
        const fromTime = getTimeFromDatetime(openingHour.endTime);

        const key = openingHour.dayOfWeek as keyof WeekSchedule;
        setWeekState((prevState: WeekSchedule) => ({
          ...prevState,
          [key]: {
            toTime,
            fromTime,
            isOpen: true,
          },
        }));
      }
    }
  }, [data.openingHours]);

  const openDay = (dayOfWeek: DAYS_OF_WEEK, open: boolean) => {
    setWeekState((prevState: WeekSchedule) => ({
      ...prevState,
      [dayOfWeek]: {
        ...prevState[dayOfWeek],
        isOpen: open,
      },
    }));
  };

  const updateTime = (dayOfWeek: DAYS_OF_WEEK, key: string, time: string) => {
    setWeekState((prevState: WeekSchedule) => ({
      ...prevState,
      [dayOfWeek]: {
        ...prevState[dayOfWeek],
        [key]: time,
      },
    }));
  };

  return (
    <Card className="drop-shadow-sm min-w-max">
      <CardHeader className="space-y-0">
        <CardTitle className="text-lg">Opening times</CardTitle>
        <CardDescription>
          Amend the times you are available for customers to book you.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {Object.entries(DAYS_OF_WEEK).map(([key, value]) => (
          <OpeningHoursForDay
            key={key}
            openDay={openDay}
            day={value}
            weekState={weekState}
            isLoading={isLoading}
            updateTime={updateTime}
            mutateOpenHour={mutateOpenHour}
          />
        ))}
      </CardContent>
    </Card>
  );
}
