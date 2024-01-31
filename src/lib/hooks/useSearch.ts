import { BusinessUser } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchBusiness = async (query: string) => {
  const resp = await axios.post("/search/business", { query });
  console.log(resp.data);
  return resp.data.businessUsers;
};

export const useSearchBusiness = (query: string) => {
  return useQuery<BusinessUser[], Error>(
    ["businessUser", "search", query],
    async () => {
      return await searchBusiness(query);
    }
  );
};
