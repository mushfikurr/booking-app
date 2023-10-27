import { db } from "@/lib/db";
import { BusinessUser, Prisma, User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import NoServicesCard from "./NoServicesCard";
import OverviewBookings from "./OverviewBookings";
import RundownStatistics from "./RundownStatistics";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import OpenFromCard from "./OpenFromCard";
import ExpectedCustomerCard from "./ExpectedCustomerCard";
import EstimatedRevenueCard from "./EstimatedRevenueCard";

export default async function Overview({
  user,
}: {
  user?: UserWithBusinessUser | null;
}) {
  const services = await db.service.findMany({
    where: { businessUserId: user?.businessUser?.id },
  });
  const bookings = await db.booking.findMany({
    where: { businessUserId: user?.businessUser?.id },
  });

  return (
    <div className="space-y-10">
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-14 w-full">
          <OpenFromCard user={user} />
          <ExpectedCustomerCard user={user} />
          <EstimatedRevenueCard user={user} />
        </div>
      </div>

      <OverviewBookings
        prefetchedBookingsData={bookings}
        businessUserId={user?.businessUser?.id}
      />
    </div>
  );
}
