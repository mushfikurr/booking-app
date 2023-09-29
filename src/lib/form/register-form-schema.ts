"use client";

import * as z from "zod";

export const RegistrationSchema = z
  .object({
    name: z
      .string({
        required_error: "A name is required",
        invalid_type_error: "A name must be a valid string",
      })
      .min(2, {
        message: "Name must be at least 3 characters long",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must contain letters",
      })
      .email({
        message: "Email has to be in a suitable format (example@domain.com)",
      })
      .max(256, { message: "Email must be a maximum of 256 characters long" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "A password must be at least 5 characters long" }),
    confirmPassword: z.string({
      required_error: "Please confirm the password you have entered",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const BusinessRegistrationPersonalSchema = z
  .object({
    name: z
      .string({
        required_error: "A name is required",
        invalid_type_error: "A name must be a valid string",
      })
      .min(2, {
        message: "Name must be at least 3 characters long",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must contain letters",
      })
      .email({
        message: "Email has to be in a suitable format (example@domain.com)",
      })
      .max(256, { message: "Email must be a maximum of 256 characters long" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "A password must be at least 5 characters long" }),
    confirmPassword: z.string({
      required_error: "Please confirm the password you have entered",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const BusinessRegistrationLocationSchema = z.object({
  streetAddress1: z
    .string({
      required_error: "Street Address 1 is required",
      invalid_type_error: "Street Address 1 must be a valid string",
    })
    .min(2, {
      message: "Street Address 1 must be at least 2 characters long",
    }),
  streetAddress2: z
    .string({
      invalid_type_error: "Street Address 2 must be a valid string",
    })
    .min(2, {
      message: "Street Address 2 must be at least 2 characters long",
    })
    .optional()
    .or(z.literal("")),
  postcode: z
    .string({
      required_error: "Postcode is required",
      invalid_type_error: "Postcode must be a valid string",
    })
    .regex(/^\w{5,8}$/, {
      message: "Postcode must be a valid UK postcode format",
    }),
});
