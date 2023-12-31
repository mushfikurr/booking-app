import { getServices } from "@/lib/query/serverQuery";
import { BusinessUser } from "@prisma/client";
import { BookingServiceCard } from "./ServiceCard";
import { ViewAllContent } from "./ViewAllContentDialog";
import { Empty } from "@/components/Empty";
import { StartBooking } from "./BookingDialog";

interface ServicesDisplayProps {
  businessUser: BusinessUser;
}

export async function ServiceList({ businessUser }: ServicesDisplayProps) {
  const services = await getServices({ businessUserId: businessUser.id });
  const serviceCards = services.map((service) => (
    <StartBooking
      key={service.id}
      businessUser={businessUser}
      service={service}
    >
      <BookingServiceCard service={service} />
    </StartBooking>
  ));

  if (!services.length) return <EmptyServicesList />;

  return (
    <div className="space-y-3">
      <span className="inline-flex items-center justify-between w-full">
        <h2 className="font-medium text-2xl">Services</h2>
        <ViewAllContent title="All services">{serviceCards}</ViewAllContent>
      </span>

      <div className="flex flex-col gap-3.5">{serviceCards}</div>
    </div>
  );
}

function EmptyServicesList() {
  return (
    <div className="space-y-3">
      <h2 className="font-medium text-2xl">Services</h2>
      <Empty>
        This business does not have any services to display at the moment.
      </Empty>
    </div>
  );
}
