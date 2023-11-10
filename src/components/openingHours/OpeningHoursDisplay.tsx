"use client";

import {
  deleteOpeningHour,
  getOpeningHoursFromServer,
  newOpeningHour,
} from "@/lib/clientQuery";
import { TimeRangeSchema } from "@/lib/form/time-range-schema";
import { cn, getTimeFromDatetime } from "@/lib/utils";
import { OpeningHour } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DoorClosed, DoorOpen, Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import { Updater, useImmer } from "use-immer";
import z, { ZodError } from "zod";
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

interface FieldErrors {
  to?: ZodError[];
  from?: ZodError[];
}

interface InputField {
  startTime?: string;
  endTime?: string;
  error?: Error | FieldErrors;
}

interface InputState {
  [DAYS.MONDAY]: InputField;
  [DAYS.TUESDAY]: InputField;
  [DAYS.WEDNESDAY]: InputField;
  [DAYS.THURSDAY]: InputField;
  [DAYS.FRIDAY]: InputField;
  [DAYS.SATURDAY]: InputField;
  [DAYS.SUNDAY]: InputField;
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

  const [inputState, updateInputState] = useImmer<InputState>({
    [DAYS.MONDAY]: {},
    [DAYS.TUESDAY]: {},
    [DAYS.WEDNESDAY]: {},
    [DAYS.THURSDAY]: {},
    [DAYS.FRIDAY]: {},
    [DAYS.SATURDAY]: {},
    [DAYS.SUNDAY]: {},
  });

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

  const onSubmit = async () => {
    for (const key of Object.keys(inputState)) {
      const inputField = inputState[key as keyof InputState];
      if (inputField.startTime && inputField.endTime) {
        try {
          await TimeRangeSchema.parseAsync({
            from: inputField.startTime,
            to: inputField.endTime,
          });
        } catch (err) {
          if (err instanceof ZodError) {
            const zodErrors = err.flatten().fieldErrors;
            console.log(zodErrors);
            updateInputState((state) => {
              state[key as keyof InputState].error = zodErrors;
            });
            toast({
              title: "Error changing opening hours",
              description:
                "Please check the values you have set and try again.",
              variant: "destructive",
            });
          } else {
            const error = err as Error;
            updateInputState((state) => {
              state[key as keyof InputState].error = error;
            });
            toast({
              title: "Error changing opening hours",
              description:
                "Please try again in a few minutes. If the error still persists, contact an admin.",
              variant: "destructive",
            });
          }
        }
      }
    }
  };

  return (
    <Card className="animate-in fade-in duration-300 ease-in-out">
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
                  inputState={inputState[day as keyof InputState]}
                  updateInputState={updateInputState}
                />
              );
            })}
          </div>
          <div>
            <Button onClick={onSubmit} type="submit">
              Submit
            </Button>
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
  inputState: InputField;
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
  const hasErrors = Object.keys(inputState?.error ?? {}).length > 0;
  const fromInputStateErrors = (inputState?.error as FieldErrors)?.from;
  const toInputStateErrors = (inputState?.error as FieldErrors)?.to;
  const clearErrors = (fromOrTo: "from" | "to") => {
    if (hasErrors) {
      updateInputState((state) => {
        delete (state[day as keyof InputState].error as FieldErrors)[fromOrTo];
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div>
          <Toggle
            pressed={isOpen}
            onClick={onToggle}
            variant="outline"
            className="flex justify-center"
          >
            {isLoadingStates ? (
              <Loader2 className="animate-spin" />
            ) : (
              toggleIcon
            )}
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
                className={cn(
                  "w-20 text-center",
                  fromInputStateErrors &&
                    fromInputStateErrors?.length > 0 &&
                    "border-destructive"
                )}
                value={inputState?.startTime}
                onChange={(e) => {
                  updateInputState((state) => {
                    state[day as keyof InputState].startTime = e.target.value;
                  });
                  if (hasErrors) {
                    clearErrors("from");
                  }
                }}
              />
              <Label htmlFor="endTime">To</Label>
              <Input
                id="endTime"
                className={cn(
                  "w-20 text-center",
                  toInputStateErrors &&
                    toInputStateErrors?.length > 0 &&
                    "border-destructive"
                )}
                value={inputState?.endTime}
                onChange={(e) => {
                  updateInputState((state) => {
                    state[day as keyof InputState].endTime = e.target.value;
                  });
                  if (hasErrors) {
                    clearErrors("to");
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <DayOpeningHoursClosed day={day} isOpen={isOpen} />
        )}
      </div>
      {hasErrors && (
        <div className="flex flex-col gap-3 ml-auto">
          {fromInputStateErrors && fromInputStateErrors?.length > 0 && (
            <div className="ml-auto p-2 bg-destructive text-destructive-foreground rounded-sm text-xs animate-in slide-in-from-right-4 fade-in ease-in-out">
              {fromInputStateErrors?.map((formError) => (
                <p key={formError.toString()}>{formError.toString()}</p>
              ))}
            </div>
          )}
          {toInputStateErrors && toInputStateErrors?.length > 0 && (
            <div className="ml-auto p-2 bg-destructive text-destructive-foreground rounded-sm text-xs animate-in slide-in-from-right-4 fade-in ease-in-out">
              {toInputStateErrors?.map((formError) => (
                <p key={formError.toString()}>{formError.toString()}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
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
