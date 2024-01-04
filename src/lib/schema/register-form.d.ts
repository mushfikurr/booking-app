import * as z from "zod";
import {
  BusinessRegistrationContactSchema,
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "./register-form-schema";

export type BusinessRegistrationPersonalType = z.infer<
  typeof BusinessRegistrationPersonalSchema
>;
export type BusinessRegistrationLocationType = z.infer<
  typeof BusinessRegistrationLocationSchema
>;
export type BusinessRegistrationContactType = z.infer<
  typeof BusinessRegistrationContactSchema
>;
export type BusinessRegistrationType =
  | BusinessRegistrationPersonalType
  | BusinessRegistrationLocationType;
