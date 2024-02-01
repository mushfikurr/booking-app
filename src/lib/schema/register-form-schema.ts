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

export const BusinessRegistrationContactSchema = z.object({
  profileId: z
    .string({ invalid_type_error: "Profile ID must be a string" })
    .min(5, {
      message: "Profile ID must be at minimum 5 characters long",
    })
    .max(40, {
      message: "Profile ID can only be at maximum 40 characters long",
    })
    .regex(/^[a-z]+(?:-[a-z]+)*(?:-\d+)?(?<!-)$/, {
      message:
        "Profile ID must only match the following characters: a-z. Multiple words can be strung together with a hyphen (i.e. john-doe-store). Numbers can be used at the end with a hyphen (i.e. john-doe-store-4)",
    }),
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

export function validateAllFormValuesAndMerge(
  formData: { [key: number]: object },
  schemas: z.ZodSchema<any>[]
): Record<string, any> {
  let validatedData: Record<string, any> = {};

  for (const pageNumber in Object.keys(formData)) {
    if (formData[pageNumber]) {
      const schemaForPageNumber = schemas[pageNumber];
      try {
        const result = schemaForPageNumber.parse(formData[pageNumber]);
        validatedData = { ...validatedData, ...result };
      } catch (err) {
        console.log(err);
        continue;
      }
    }
  }

  return validatedData;
}
