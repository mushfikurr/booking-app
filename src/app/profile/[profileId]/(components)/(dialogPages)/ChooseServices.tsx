import { useQuery } from "@tanstack/react-query";
import { useBookingDialogContext } from "../BookingDialogContext";
import { getServices } from "@/lib/clientQuery";
import { Service } from "@prisma/client";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { SelectableServiceCard } from "../ServiceCard";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";

export function ChooseServices() {
  const { setTitle, businessUser, services, setServices, setCurrentPage } =
    useBookingDialogContext();
  setTitle("Choose services to add to your booking");

  const { data, isLoading, isError } = useQuery(["service"], async () => {
    return await getServices(businessUser.id);
  });

  const isServiceInServices = (service: Service) =>
    services.some((o) => o.id === service.id);

  const addServiceToBooking = (service: Service) => {
    if (isServiceInServices(service)) {
      setServices(services.filter((o) => o.id !== service.id));
    } else {
      setServices([...services, service]);
    }
  };

  const handleDone = () => setCurrentPage("addServices");

  const serviceList =
    !data || isLoading ? (
      <LoadingSkeleton />
    ) : (
      data.services.map((service: Service) => (
        <SelectableServiceCard
          key={service.id}
          service={service}
          selected={isServiceInServices(service)}
          handleClick={() => {
            addServiceToBooking(service);
          }}
        />
      ))
    );

  return (
    <form className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 px-6">
        <span className="inline-flex justify-between items-center">
          <h2 className="text-xl font-medium">Select services</h2>
        </span>

        <ScrollableArea>
          {isError ? (
            <Empty>There was an error fetching the services. Try again.</Empty>
          ) : (
            serviceList
          )}
        </ScrollableArea>
      </div>
      <BookingDialogFooter>
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-secondary-foreground"
            size="lg"
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </BookingDialogFooter>
    </form>
  );
}
