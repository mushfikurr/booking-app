import { getServerSession } from "next-auth";
import { cache } from "react";
import { db } from "./db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

const getOpeningHoursData = cache(async (businessId: string | undefined) => {
  if (!businessId) {
    console.error("No business id...");
    return undefined;
  }
  const data = await db.openingHour.findMany({ where: { businessId } });
  return data;
});

const getUserWithBusinessData = cache(async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  const userData = await db.user.findUnique({
    where: { id: user?.id },
    include: { businessUser: true },
  });

  return userData;
});

export type GetUserWithBusinessDataReturn = Prisma.PromiseReturnType<
  typeof getUserWithBusinessData
>;

export { getUserWithBusinessData, getOpeningHoursData };
