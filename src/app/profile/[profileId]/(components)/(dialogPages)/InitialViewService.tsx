import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { Service } from "@prisma/client";
import { Plus } from "lucide-react";
import { BookingDialogFooter, ScrollableArea } from "../BookingDialog";
import { useBookingDialogContext } from "../BookingDialogContext";
import IconButton from "../IconButton";
import { RemovableServiceCard } from "../ServiceCard";
import { useEffect, useRef } from "react";
import { ScrollAreaElement } from "@radix-ui/react-scroll-area";
import autoAnimate from "@formkit/auto-animate";
import { NextButton } from "../NextButton";

export function AddServices() {
  const { businessUser, services, setServices, setCurrentPageState, setTitle } =
    useBookingDialogContext();
  setTitle(`Booking with ${businessUser.user.name}`);

  const scrollAreaRef = useRef<ScrollAreaElement>(null);
  useEffect(() => {
    scrollAreaRef.current && autoAnimate(scrollAreaRef.current);
  }, [parent]);

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
      <BookingDialogFooter services={services}>
        <NextButton nextPage="chooseDate" disabled={!services.length}>
          Find a slot
        </NextButton>
      </BookingDialogFooter>
    </>
  );
}
