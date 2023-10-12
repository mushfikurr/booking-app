import { AlertCircle, Clock, Settings2, Users } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { Booking, BusinessUser, Service, User } from "@prisma/client";
import OverviewBookings from "./OverviewBookings";
import RundownStatistics from "./RundownStatistics";
import NoServicesCard from "./NoServicesCard";
import ExtraStatisticCards from "./ExtraStatisticCards";

export default async function Overview({
  user,
  businessUser,
}: {
  user: User;
  businessUser: BusinessUser;
}) {
  const services = await db.service.findMany({
    where: { businessUserId: businessUser?.id },
  });
  const bookings = await db.booking.findMany({
    where: { businessUserId: businessUser?.id },
  });

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="hidden sm:block">
        <div className="flex gap-6">
          <NoServicesCard
            prefetchedServicesData={services}
            businessUserId={businessUser?.id}
          />
          <Card className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out w-full">
            <CardHeader className="pb-2 space-y-1">
              <CardTitle className="text-xl">Hello {firstName}!</CardTitle>
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
        businessUserId={businessUser?.id}
      />
    </div>
  );
}
