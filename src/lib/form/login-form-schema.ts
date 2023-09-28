"use client";

import * as z from "zod";

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email has to be in a suitable format (example@domain.com)",
    })
    .max(256, {
      message: "Email can only be a maximum of 256 characters long",
    }),
  password: z.string({ required_error: "Password is required" }),
});

export default LoginSchema;
