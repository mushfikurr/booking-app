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

export const BusinessRegistrationContactSchema = z.object({
  phoneNumber: z
    .string({ invalid_type_error: "Phone number must be a valid string" })
    .min(11, {
      message: "Phone number must be at least 11 characters long",
    })
    .regex(/^((\+44)|(0)) ?\d{4} ?\d{6}$/, {
      message: "Phone number must be in valid UK format",
    }),
  instagram: z
    .string({
      invalid_type_error: "Instagram handle must be a valid string",
    })
    .min(3, {
      message: "Instagram handle must be a minimum of 3 characters long",
    })
    .max(30, {
      message: "Instagram handle must be a maximum of 30 characters long",
    })
    .optional()
    .or(z.literal("")),
  businessEmail: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must contain letters",
    })
    .email({
      message: "Email has to be in a suitable format (example@domain.com)",
    })
    .max(256, { message: "Email must be a maximum of 256 characters long" }),
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
