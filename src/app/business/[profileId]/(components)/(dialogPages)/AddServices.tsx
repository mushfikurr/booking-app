import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useServices } from "@/lib/hooks/useServices";
import { Service } from "@prisma/client";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import { NextButton } from "../NextButton";
import { SelectableServiceCard } from "../ServiceCard";

export function ChooseServices() {
  const { setTitle, businessUser, services, setServices } =
    useBookingDialogContext();
  setTitle("Choose services to add to your booking");

  const { data, isLoading, isError } = useServices(businessUser.id);

  const isServiceInServices = (service: Service) =>
    services.some((o) => o.id === service.id);

  const addServiceToBooking = (service: Service) => {
    if (isServiceInServices(service)) {
      setServices(services.filter((o) => o.id !== service.id));
    } else {
      setServices([...services, service]);
    }
  };

  const serviceList = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (!data?.length) {
      return (
        <Empty>
          This business does not have any services to book at the moment.
        </Empty>
      );
    }

    if (isError) {
      return (
        <Empty>There was an error fetching the services. Try again.</Empty>
      );
    }

    return data.map((service: Service) => (
      <SelectableServiceCard
        key={service.id}
        service={service}
        selected={isServiceInServices(service)}
        handleClick={() => {
          addServiceToBooking(service);
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 px-6">
        <ScrollableArea>{serviceList()}</ScrollableArea>
      </div>
      <BookingDialogFooter services={services}>
        <NextButton nextPage="addServices">Done</NextButton>
      </BookingDialogFooter>
    </div>
  );
}
