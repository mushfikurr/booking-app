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
  return resp.data.openingHours;
};

export const useOpeningHours = (
  businessId?: string,
  prefetchedOpeningHours?: OpeningHour[],
  query?: Partial<OpeningHour>
) => {
  return useQuery<OpeningHour[], Error>(
    ["openingHour"],
    async () => {
      if (!businessId) throw Error("No business ID");
      const response = await getOpeningHours(businessId, query);
      return response.openingHours;
    },
    { initialData: prefetchedOpeningHours }
  );
};
