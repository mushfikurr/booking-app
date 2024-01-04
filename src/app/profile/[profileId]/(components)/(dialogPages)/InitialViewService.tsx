import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
import { Plus } from "lucide-react";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import IconButton from "../IconButton";
import { RemovableServiceCard } from "../ServiceCard";
import { Statistics } from "../Statistics";

export function AddServices() {
  const { businessUser, services, setServices, setCurrentPageState, setTitle } =
    useBookingDialogContext();
  setTitle(`Booking with ${businessUser.user.name}`);

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

  const handleAddService = () => setCurrentPageState("chooseServices");
  const handleChooseDate = () => setCurrentPageState("chooseDate");

  return (
    <>
      <div className="flex flex-col gap-3 px-6">
        <span className="inline-flex justify-between items-center">
          <h2 className="text-xl font-medium">Services</h2>
          <IconButton Icon={Plus} onClick={handleAddService}>
            Add services
          </IconButton>
        </span>

        <ScrollableArea>{serviceList}</ScrollableArea>
      </div>
      <BookingDialogFooter>
        <div
          className={cn(
            "text-primary-foreground flex flex-wrap justify-between items-center gap-3",
            "max-sm:gap-6"
          )}
        >
          <Statistics services={services} />
          <Button
            size="lg"
            disabled={!services.length}
            onClick={handleChooseDate}
          >
            Find a slot
          </Button>
        </div>
      </BookingDialogFooter>
    </>
  );
}
