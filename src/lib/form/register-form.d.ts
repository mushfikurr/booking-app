import * as z from "zod";
import {
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "./register-form-schema";

export type BusinessRegistrationPersonalType = z.infer<
  typeof BusinessRegistrationPersonalSchema
>;
export type BusinessRegistrationLocationType = z.infer<
  typeof BusinessRegistrationLocationSchema
>;
export type BusinessRegistrationType =
  | BusinessRegistrationPersonalType
  | BusinessRegistrationLocationType;
