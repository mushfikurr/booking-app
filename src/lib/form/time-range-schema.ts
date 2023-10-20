import { z } from "zod";

export const TimeRangeSchema = z
  .object({
    from: z
      .string({
        invalid_type_error: "From time needs to be a number",
        required_error: "From is required",
      })
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        // regex for MM:SS
        message: "From time must be in 24-hour format (HH:MM)",
      }),
    to: z
      .string({
        invalid_type_error: "Todtime needs to be a number",
        required_error: "To is required",
      })
      .regex(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, {
        // regex for 24-hour
        message: "To time must be in 24-hour format (HH:MM)",
      }),
  })
  .refine((data) => {
    try {
      // Check if to is greater than from (or equal)
      const fromTime = new Date();
      const fromHours = parseInt(data.from.split(":")[0]);
      const fromMinutes = parseInt(data.from.split(":")[1]);
      fromTime.setHours(fromHours, fromMinutes, 0);

      const toTime = new Date();
      const toHours = parseInt(data.to.split(":")[0]);
      const toMinutes = parseInt(data.to.split(":")[1]);
      toTime.setHours(toHours, toMinutes, 0);

      if (toTime >= fromTime) {
        return {
          message: "To time is greater than or equals from time",
          path: ["to"],
        };
      }
    } catch (err) {
      console.error(err);
      return {
        message: "Error parsing",
        path: ["to"],
      };
    }
  });
