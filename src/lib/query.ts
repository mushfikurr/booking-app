import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { db } from "./db";

const getUserWithBusinessData = cache(async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  const userData = await db.user.findUnique({
    where: { email: user?.email as string },
  });
  const businessUser = await db.businessUser.findUnique({
    where: { userId: userData?.id },
  });

  return { userData, businessUser };
});

export { getUserWithBusinessData };
