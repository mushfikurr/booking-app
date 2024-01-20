import { OpeningHour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOpeningHours = async (
  businessUserId: string,
  query?: Partial<OpeningHour>
) => {
  const resp = await axios.post("/api/openingHour/many", {
    businessUserId,
    ...query,
  });
  if (Array.isArray(resp.data.openingHours)) {
    return resp.data.openingHours[0];
  } else {
    throw new Error(resp.data.error ?? "Error retrieving opening hours");
  }
};

export const useOpeningHours = (
  businessId?: string,
  prefetchedOpeningHours?: OpeningHour,
  queryId?: string,
  query?: Partial<OpeningHour>
) => {
  return useQuery<OpeningHour, Error>(
    ["openingHour", queryId],
    async () => {
      if (!businessId) throw Error("No business ID");
      const response = await getOpeningHours(businessId, query);
      return response;
    },
    { initialData: prefetchedOpeningHours }
  );
};

export const useManyOpeningHours = (
  businessId?: string,
  prefetchedOpeningHours?: OpeningHour[]
) => {
  return useQuery<OpeningHour[], Error>(
    ["openingHour"],
    async () => {
      if (!businessId) throw Error("No business ID");
      const response = await getOpeningHours(businessId);
      return response[0] ?? [];
    },
    { initialData: prefetchedOpeningHours }
  );
};
