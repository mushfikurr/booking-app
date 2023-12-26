import { Clock, LucideIcon, Plus, Wallet2 } from "lucide-react";
import { useBookingDialogContext } from "../BookingDialogContext";
import { Service } from "@prisma/client";
import { Empty } from "@/components/Empty";
import { RemovableServiceCard } from "../ServiceCard";
import { cn } from "@/lib/utils";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { Button } from "@/components/ui/button";

export function AddServices() {
  const { businessUser, services, setServices, setCurrentPage, setTitle } =
    useBookingDialogContext();

  setTitle(`Add services to book with ${businessUser?.user.name}`);

  const handleRemoveService = (service: Service) => {
    setServices(services.filter((o) => o.id !== service.id));
  };

  const serviceList = !services.length ? (
    <Empty className="font-medium">
      Start your booking by adding services.
    </Empty>
  ) : (
    services.map((service) => (
      <RemovableServiceCard
        key={service.id}
        service={service}
        handleClick={() => handleRemoveService(service)}
      />
    ))
  );

  const handleAddService = () => setCurrentPage("chooseServices");
  const totalCost = services.reduce(
    (i, service) => i + parseFloat(service.price),
    0
  );
  const totalWait =
    services.reduce((i, service) => i + service.estimatedTime, 0) * 1000;

  const humanizeDuration = require("humanize-duration");

  const formattedTotalCost = `£${totalCost}`;
  const formattedTotalWait = humanizeDuration(totalWait);

  const statisticClassNames = {
    "text-primary-foreground": services.length,
    "text-primary-foreground/70": !services.length,
  };

  return (
    <>
      <div className="flex flex-col gap-3 px-6">
        <span className="inline-flex justify-between items-center">
          <h2 className="text-xl font-medium">Services</h2>
          <button
            className={cn(
              "inline-flex gap-3 text-muted-foreground items-center font-medium group/add-services",
              "hover:text-foreground active:text-foreground",
              "transition duration-200 ease-in-out"
            )}
            onClick={handleAddService}
          >
            <Plus className="h-4 w-4 group-hover/add-services:scale-105" />
            <p className="text-sm">Add services</p>
          </button>
        </span>

        <ScrollableArea>{serviceList}</ScrollableArea>
      </div>
      <BookingDialogFooter>
        <div className="text-primary-foreground flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-6 select-none">
            <Statistic Icon={Wallet2} className={cn(statisticClassNames)}>
              {formattedTotalCost}
            </Statistic>
            <Statistic Icon={Clock} className={cn(statisticClassNames)}>
              {formattedTotalWait}
            </Statistic>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="text-secondary-foreground"
            disabled={!services.length}
          >
            Review booking
          </Button>
        </div>
      </BookingDialogFooter>
    </>
  );
}

interface StatisticProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}
function Statistic({ Icon, children, className }: StatisticProps) {
  return (
    <span className="inline-flex gap-3">
      <Icon className="text-primary-foreground/70" />
      <p className={cn(className)}>{children}</p>
    </span>
  );
}
