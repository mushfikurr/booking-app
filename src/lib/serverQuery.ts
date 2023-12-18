import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BusinessUser, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { db } from "./db";

const getOpeningHoursData = cache(async (businessId: string | undefined) => {
  if (!businessId) {
    console.error("No business id...");
    return undefined;
  }
  const data = await db.openingHour.findMany({ where: { businessId } });
  return data;
});

const getBookingsData = cache(async (businessId: string) => {
  if (!businessId) {
    console.error("No business id...");
    return undefined;
  }
  const data = await db.booking.findMany({
    where: { businessUserId: businessId },
  });
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

export const getBusinessUser = cache(
  async (businessUserQuery: Partial<BusinessUser>) => {
    const businessUser = await db.businessUser.findFirst({
      where: businessUserQuery,
    });
    console.log(businessUser);

    return businessUser;
  }
);

export type GetUserWithBusinessDataReturn = Prisma.PromiseReturnType<
  typeof getUserWithBusinessData
>;

export { getBookingsData, getOpeningHoursData, getUserWithBusinessData };
