"use client";

import {
  getOpeningHoursFromServer,
  newOpeningHour,
  deleteOpeningHour,
} from "@/lib/clientQuery";
import { TimeRangeSchema } from "@/lib/form/time-range-schema";
import { getTimeFromDatetime } from "@/lib/utils";
import { OpeningHour } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DoorClosed, DoorOpen, Loader2 } from "lucide-react";
import { Updater, useImmer } from "use-immer";
import { FC, useEffect } from "react";
import z from "zod";
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
import { Button } from "../ui/button";

enum DAYS {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

interface OpeningHoursDisplayProps {
  businessId?: string;
  prefetchedOpeningHours?: OpeningHour[];
}

interface InputState {
  [DAYS.MONDAY]: { startTime?: string; endTime?: string };
  [DAYS.TUESDAY]: { startTime?: string; endTime?: string };
  [DAYS.WEDNESDAY]: { startTime?: string; endTime?: string };
  [DAYS.THURSDAY]: { startTime?: string; endTime?: string };
  [DAYS.FRIDAY]: { startTime?: string; endTime?: string };
  [DAYS.SATURDAY]: { startTime?: string; endTime?: string };
  [DAYS.SUNDAY]: { startTime?: string; endTime?: string };
}

export default function OpeningHoursDisplay({
  businessId,
  prefetchedOpeningHours,
}: OpeningHoursDisplayProps) {
  const WEEK = [
    DAYS.MONDAY,
    DAYS.TUESDAY,
    DAYS.WEDNESDAY,
    DAYS.THURSDAY,
    DAYS.FRIDAY,
    DAYS.SATURDAY,
    DAYS.SUNDAY,
  ];

  const { data } = useQuery<OpeningHour[], Error>(
    ["openingHour"],
    async () => {
      if (!businessId) throw Error("No business ID");
      const response = await getOpeningHoursFromServer(businessId);
      return response.openingHours;
    },
    { initialData: prefetchedOpeningHours }
  );

  const getDataForDay = (day: string) => {
    if (data) {
      const dayObj = data.find((openingHour) => openingHour.dayOfWeek === day);
      return dayObj ?? undefined;
    }

    return undefined;
  };

  const [inputState, updateInputState] = useImmer<InputState>({
    [DAYS.MONDAY]: {},
    [DAYS.TUESDAY]: {},
    [DAYS.WEDNESDAY]: {},
    [DAYS.THURSDAY]: {},
    [DAYS.FRIDAY]: {},
    [DAYS.SATURDAY]: {},
    [DAYS.SUNDAY]: {},
  });

  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle className="text-lg font-medium">Opening hours</CardTitle>
        <CardDescription>
          Amend your opening hours for your customers to book.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            {WEEK.map((day) => {
              const dataForDay = getDataForDay(day);
              return (
                <DayOpeningHours
                  businessId={businessId}
                  key={day}
                  day={day}
                  data={dataForDay}
                  isOpen={!!dataForDay}
                  inputState={inputState}
                  updateInputState={updateInputState}
                />
              );
            })}
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DayOpeningHoursProps {
  day: string;
  data?: Partial<OpeningHour>;
  isOpen: boolean;
  businessId?: string;
  inputState: InputState;
  updateInputState: Updater<InputState>;
}

const DayOpeningHours: FC<DayOpeningHoursProps> = ({
  day,
  data,
  isOpen,
  businessId,
  inputState,
  updateInputState,
}) => {
  type OpenMutationParamaters = [string, z.infer<typeof TimeRangeSchema>];
  const queryClient = useQueryClient();
  const openMutation = useMutation<OpeningHour, Error, OpenMutationParamaters>(
    ["openingHour"],
    async (params: OpenMutationParamaters) => {
      if (!businessId) throw Error("No business ID");
      const [day, values] = params;
      const response = await newOpeningHour(businessId, day, values);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["openingHour"]);
      },
    }
  );

  const closeMutation = useMutation<OpeningHour, Error, number>(
    ["openingHour"],
    async (id) => {
      const response = await deleteOpeningHour(id);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["openingHour"]);
      },
    }
  );

  const defaultStartTime = new Date();
  defaultStartTime.setHours(9);
  defaultStartTime.setMinutes(15);

  const defaultEndTime = new Date();
  defaultEndTime.setHours(17);
  defaultEndTime.setMinutes(15);

  const defaultData: Partial<OpeningHour> = {
    dayOfWeek: day,
    startTime: defaultStartTime,
    endTime: defaultEndTime,
  };

  const { dayOfWeek, startTime, endTime } = data ?? defaultData;
  const formattedStartTime = getTimeFromDatetime(
    JSON.parse(JSON.stringify(startTime))
  );
  const formattedEndTime = getTimeFromDatetime(
    JSON.parse(JSON.stringify(endTime))
  );

  useEffect(() => {
    updateInputState((state) => {
      state[day as keyof InputState].startTime = formattedStartTime as string;
      state[day as keyof InputState].endTime = formattedEndTime as string;
    });
  }, [data]);

  const toggleIcon = isOpen ? <DoorOpen /> : <DoorClosed />;
  const onToggle = async () => {
    try {
      if (!isOpen) {
        const values = {
          from: formattedStartTime as string,
          to: formattedEndTime as string,
        };
        await openMutation.mutateAsync([day, values]);
      } else {
        if (!data?.id) return;
        await closeMutation.mutateAsync(data.id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const isLoadingStates = openMutation.isLoading || closeMutation.isLoading;

  return (
    <div className="flex items-center gap-4">
      <div>
        <Toggle
          pressed={isOpen}
          onClick={onToggle}
          variant="outline"
          className="flex justify-center"
        >
          {isLoadingStates ? <Loader2 className="animate-spin" /> : toggleIcon}
        </Toggle>
      </div>

      {isOpen ? (
        <div className="flex items-center gap-4 border border-border w-full p-3 rounded-sm">
          <div className="flex-grow">
            <h5 className="uppercase text-xs text-muted-foreground font-semibold">
              {isOpen ? "Open" : "Closed"}
            </h5>
            <h5 className="text-md font-medium">{dayOfWeek}</h5>
          </div>
          <div className="flex gap-3 items-center">
            <Label htmlFor="startTime">From</Label>
            <Input
              id="startTime"
              className="w-20 text-center"
              value={inputState[day as keyof InputState]?.startTime}
              onChange={(e) => {
                updateInputState((state) => {
                  state[day as keyof InputState].startTime = e.target.value;
                });
              }}
            />
            <Label htmlFor="endTime">To</Label>
            <Input
              id="endTime"
              className="w-20 text-center"
              value={inputState[day as keyof InputState]?.endTime}
              onChange={(e) => {
                updateInputState((state) => {
                  state[day as keyof InputState].endTime = e.target.value;
                });
              }}
            />
          </div>
        </div>
      ) : (
        <DayOpeningHoursClosed day={day} isOpen={isOpen} />
      )}
    </div>
  );
};

interface DayOpeningHoursClosedProps {
  day: string;
  isOpen: boolean;
}

const DayOpeningHoursClosed: FC<DayOpeningHoursClosedProps> = ({
  day,
  isOpen,
}) => {
  return (
    <div className="flex items-center gap-4 border border-border bg-muted w-full p-3 rounded-sm">
      <div className="flex-grow">
        <h5 className="uppercase text-xs text-muted-foreground font-semibold">
          {isOpen ? "Open" : "Closed"}
        </h5>
        <h5 className="text-md font-medium text-muted-foreground">{day}</h5>
      </div>
    </div>
  );
};
