"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUser = async (userId: string) => {
  const resp = await axios.post("/api/user", { userId });
  return resp.data;
};

export const useUser = (userId?: string) => {
  return useQuery(["user", userId], async () => {
    if (!userId) {
      throw Error("No user ID provided!");
    }
    return await getUser(userId);
  });
};
