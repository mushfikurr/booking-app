// TODO: Move all client get requests to this file to avoid repeated query definitions.

"use client";

import { OpeningHoursInputState } from "@/components/openingHours/OpeningHoursDisplay";
import axios from "axios";
import { z } from "zod";
import {
  EditProfileContactSchema,
  EditProfileLocationSchema,
  EditProfilePersonalSchema,
} from "../schema/edit-profile-schema";
import { TimeRangeSchema } from "../schema/time-range-schema";
import { Service } from "@prisma/client";
import { Slot } from "../hooks/useSlots";

export const getServices = async (businessUserId: string) => {
  const resp = await axios.post("/api/service", { businessUserId });
  return resp.data;
};

export const getUserWithBusinessDataFromServer = async (userId: string) => {
  const resp = await axios.post("/api/businessUser", { userId });
  return resp.data;
};

export const getOpeningHoursFromServer = async (businessId: string) => {
  const resp = await axios.post("/api/openingHour", {
    businessUserId: businessId,
  });
  return resp.data;
};

export const newBooking = async (
  services: Service[],
  slot: Slot,
  businessUserId: string
) => {
  const resp = await axios.post("/api/booking/new", {
    services,
    slot,
    businessUserId,
  });
  return resp.data;
};

export const newOpeningHour = async (
  businessId: string,
  dayOfWeek: string,
  values: z.infer<typeof TimeRangeSchema>
) => {
  const resp = await axios.post("/api/openingHour/new", {
    businessId: businessId,
    fromTime: values.from,
    toTime: values.to,
    dayOfWeek,
  });
  return resp.data;
};

export const deleteOpeningHour = async (openingHourId: number) => {
  const resp = await axios.delete("/api/openingHour/delete", {
    data: {
      id: openingHourId,
    },
  });
  return resp.data;
};

export const updateManyOpeningHour = async (
  businessId: string,
  listOfOpeningHours: OpeningHoursInputState
) => {
  const resp = await axios.post("/api/openingHour/many", {
    businessId,
    listOfOpeningHours,
  });
  return resp;
};

export const updateLocationDetailsForUser = async (
  userId: string,
  values: z.infer<typeof EditProfileLocationSchema>
) => {
  const updatedValues = {
    userId,
    values: {
      type: "business",
      formValues: {
        streetAddress1: values.streetAddress1,
        streetAddress2: values.streetAddress2,
        postcode: values.postcode,
      },
    },
  };

  const resp = await axios.put(
    "/api/businessUser/updateBusinessUser",
    updatedValues
  );
  return resp;
};

export const updateContactDetailsForUser = async (
  userId: string,
  values: z.infer<typeof EditProfileContactSchema>
) => {
  const updatedValues = {
    userId,
    values: {
      type: "business",
      formValues: {
        phoneNumber: values.phoneNumber,
        instagram: values.instagram,
        businessEmail: values.businessEmail,
      },
    },
  };

  const resp = await axios.put(
    "/api/businessUser/updateBusinessUser",
    updatedValues
  );
  return resp;
};

export const updatePersonalDetailsForUser = async (
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
