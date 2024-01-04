import { useQuery } from "@tanstack/react-query";
import { useBookingDialogContext } from "../BookingDialogContext";
import { getServices } from "@/lib/query/clientQuery";
import { Service } from "@prisma/client";
import { SelectableServiceCard } from "../ServiceCard";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { Statistics } from "../Statistics";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

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
      <BookingDialogFooter>
        <div className="flex justify-between">
          <Statistics services={services} />
          <Button size="lg" onClick={handleDone}>
            Done
          </Button>
        </div>
      </BookingDialogFooter>
    </div>
  );
}
