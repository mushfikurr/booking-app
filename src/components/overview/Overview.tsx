import { db } from "@/lib/db";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Calendar, Scissors } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import EstimatedRevenueCard from "./EstimatedRevenueCard";
import ExpectedCustomerCard from "./ExpectedCustomerCard";
import ManageBusinessCard, {
  ManageBusinessCardProps,
} from "./ManageBusinessCard";
import OpenFromCard from "./OpenFromCard";
import OverviewBookings from "./OverviewBookings";
import { getBookingsData, getOpeningHoursData } from "@/lib/serverQuery";
import { Booking } from "@prisma/client";

export default async function Overview({
  user,
}: {
  user?: UserWithBusinessUser | null;
}) {
  const businessId = user?.businessUser?.id;
  const bookings = await getBookingsData(businessId);
  const openingHours = await getOpeningHoursData(businessId);

  const manageBusinessCards: ManageBusinessCardProps[] = [
    {
      title: "Create a service",
      description:
        "Services allow customers to find out about what you offer, how much it may cost, and how long it may take.",
      navigateUrl: "/dashboard/services",
      buttonText: "Navigate to services",
      ButtonIcon: Scissors,
    },
    {
      title: "Manage bookings",
      description:
        "View and edit bookings that customers have made at your business.",
      navigateUrl: "/dashboard/bookings",
      buttonText: "Manage bookings",
      ButtonIcon: Calendar,
    },
  ];

  return (
    <div className="block space-y-10 lg:space-y-0 lg:flex gap-10">
      <div className="flex flex-col gap-10 flex-grow">
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-8 w-full">
          <OpenFromCard
            prefetchedOpeningHours={openingHours}
            businessId={businessId}
          />
          <ExpectedCustomerCard user={user} />
          <EstimatedRevenueCard user={user} />
        </div>

        <OverviewBookings
          prefetchedBookingsData={bookings as Booking[]}
          businessUserId={user?.businessUser?.id}
        />
      </div>
      <Card className="drop-shadow-sm max-w-md max-h-full">
        <CardHeader>
          <CardTitle>Manage your business</CardTitle>
          <CardDescription>
            Things you can do to make your business come alive!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {manageBusinessCards.map((card) => (
              <ManageBusinessCard
                key={card.title}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                navigateUrl={card.navigateUrl}
                ButtonIcon={card.ButtonIcon}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
