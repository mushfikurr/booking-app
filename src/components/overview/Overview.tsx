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
import { UserWithBusinessUser } from "../../../@types/prisma";

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

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="hidden sm:block">
        <div className="flex gap-6">
          <NoServicesCard
            prefetchedServicesData={services}
            businessUserId={user?.businessUser?.id}
          />
          <Card className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out w-full">
            <CardHeader className="pb-2 space-y-1">
              <CardTitle>Hello {firstName}!</CardTitle>
              <CardDescription>Here's your rundown for today</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <RundownStatistics />
            </CardContent>
          </Card>
          {/* <ExtraStatisticCards /> */}
        </div>
      </div>

      <OverviewBookings
        prefetchedBookingsData={bookings}
        businessUserId={user?.businessUser?.id}
      />
    </div>
  );
}
