import { z } from "zod";

const EditProfilePersonalSchema = z
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
      .min(5, { message: "A password must be at least 5 characters long" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string({
        required_error: "Please confirm the password you have entered",
      })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirmPassword;
      } else {
        return true;
      }
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const EditProfileLocationSchema = z.object({
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

export const EditProfileContactSchema = z.object({
  about: z
    .string({ invalid_type_error: "About me must be a string" })
    .min(5, { message: "About me must be at least 5 characters long" })
    .max(500, { message: "About me can only be 500 characters." })
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string({ invalid_type_error: "Phone number must be a valid string" })
    .min(11, {
      message: "Phone number must be at least 11 characters long",
    })
    .regex(/^((\+44)|(0)) ?\d{4} ?\d{6}$/, {
      message: "Phone number must be in valid UK format",
    }),

  businessDisplayName: z
    .string({ invalid_type_error: "Business display name must be a string" })
    .min(5, {
      message: "Business display name must be at minimum 5 characters long",
    })
    .max(50, {
      message:
        "Business display name can only be at maximum 50 characters long",
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

export { EditProfilePersonalSchema };
