import { Service } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getServices = async (businessUserId: string) => {
  const resp = await axios.post("/api/service", { businessUserId });
  return resp.data.services;
};

export const useServices = (
  businessUserId?: string,
  prefetchedServicesData?: Service[]
) => {
  return useQuery<Service[], Error>(
    ["service"],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided.");
      return await getServices(businessUserId);
    },
    { initialData: prefetchedServicesData }
  );
};
