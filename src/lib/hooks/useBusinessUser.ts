import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBusinessUser = async (userId: string) => {
  const resp = await axios.post("/api/businessUser", { userId });
  return resp.data;
};

export const useBusinessUser = (userId?: string, prefetchedUser?: User) => {
  return useQuery(
    ["user"],
    async () => {
      if (!userId) {
        throw Error("No user ID provided!");
      }
      return await getBusinessUser(userId);
    },
    { initialData: prefetchedUser }
  );
};
