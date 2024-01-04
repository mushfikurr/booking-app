"use client";

import * as z from "zod";

const NewServiceSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name needs to be a string",
      required_error: "A name is required for the service",
    })
    .min(5, { message: "Name should have at least 5 characters" })
    .max(200, { message: "Name should have a maximum of 200 characters" }),
  description: z
    .string({
      invalid_type_error: "Name needs to be a string",
      required_error: "A name is required for the service",
    })
    .min(5, { message: "Description should have at least 5 characters" })
    .max(500, {
      message: "Description should have a maximum of 500 characters",
    })
    .optional()
    .or(z.literal("")),
  price: z
    .string({
      invalid_type_error: "Price needs to be a number",
      required_error: "Price is required",
    })
    .regex(/(\d+\.\d{1,2})/, {
      message: "Price needs to be in a valid price format",
    }),
  estimatedTime: z
    .string({
      invalid_type_error: "Estimated time needs to be a number",
      required_error: "Estimated time is required",
    })
    .regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/, { // regex for HH:MM:SS
      message: "Estimated time must be in HH:MM:SS format.",
    }),
});

export default NewServiceSchema;
