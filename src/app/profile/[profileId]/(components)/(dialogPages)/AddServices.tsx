import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/query/clientQuery";
import { Service } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import { SelectableServiceCard } from "../ServiceCard";

export function ChooseServices() {
  const { setTitle, businessUser, services, setServices, setCurrentPageState } =
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

  const handleDone = () => setCurrentPageState("addServices");

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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 px-6">
        <ScrollableArea>
          {isError ? (
            <Empty>There was an error fetching the services. Try again.</Empty>
          ) : (
            serviceList
          )}
        </ScrollableArea>
      </div>
      <BookingDialogFooter services={services}>
        <Button size="lg" onClick={handleDone}>
          Done
        </Button>
      </BookingDialogFooter>
    </div>
  );
}
