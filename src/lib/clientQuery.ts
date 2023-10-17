// TODO: Move all client get requests to this file to avoid repeated query definitions.

"use client";

import axios from "axios";

export const getUserWithBusinessDataFromClient = async (userId?: string) => {
  const resp = await axios.post("/api/businessUser", { userId });
  return resp;
};
