"use client";

import axios from "axios";
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

const doesAttributeExistForUser = async (
  attribute: string,
  attributeName: string,
  value: any
) => {
  const uniqueQuery = await axios.post("/api/register/attributeExists", {
    attribute,
    attributeName,
    value,
  });

  if (uniqueQuery.data.exists === true) {
    return true;
  } else {
    return false;
  }
};

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
      .max(256, { message: "Email must be a maximum of 256 characters long" })
      .refine(
        async (val) => {
          // This seems to run when any input changes. Transition to react-use-hook instead of in schema?
          const doesEmailExistForUser = await doesAttributeExistForUser(
            "email",
            "email",
            val
          );
          return !doesEmailExistForUser;
        },
        { message: "This email has already been registered." }
      ),
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

type DataItem = Record<string, any>;
type SchemaItem = z.ZodSchema<any>;

export function unifyAndValidateData(
  data: DataItem[],
  schemas: SchemaItem[]
): any {
  const validatedData: Record<string, any> = {};

  for (const item of data) {
    for (const schema of schemas) {
      try {
        const parsedItem = schema.parse(item);

        for (const key in parsedItem) {
          validatedData[key] = parsedItem[key];
        }

        break;
      } catch (error) {
        continue;
      }
    }
  }

  return validatedData;
}
