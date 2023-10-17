// TODO: Move all client get requests to this file to avoid repeated query definitions.

"use client";

import axios from "axios";
import { z } from "zod";
import { EditProfilePersonalSchema } from "./form/edit-profile-schema";

export const getUserWithBusinessDataFromClient = async (userId: string) => {
  const resp = await axios.post("/api/businessUser", { userId });
  return resp.data;
};

export const updatePersonalUser = async (
  userId: string,
  values: z.infer<typeof EditProfilePersonalSchema>
) => {
  const updatedValues = {
    userId: userId,
    values: {
      type: "personal",
      formValues: {
        name: values.name,
        email: values.email,
        hashedPassword: values.password,
      },
    },
  };

  const resp = await axios.put(
    "/api/businessUser/updateBusinessUser",
    updatedValues
  );
  return resp;
};
