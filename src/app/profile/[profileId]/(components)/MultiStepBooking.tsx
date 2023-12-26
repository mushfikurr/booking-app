"use client";

import { Empty } from "@/components/Empty";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServices } from "@/lib/clientQuery";
import { cn } from "@/lib/utils";
import { BusinessUser, Service } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Clock, PackagePlus, Plus, Wallet2 } from "lucide-react";
import {
  BookingDialogProvider,
  PageType,
  useBookingDialogContext,
} from "./BookingDialogContext";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { RemovableServiceCard, SelectableServiceCard } from "./ServiceCard";

interface StartBookingButtonProps {
  children: React.ReactNode;
  businessUser: BusinessUser;
}

export function StartBooking({
  children,
  businessUser,
}: StartBookingButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <BookingDialogProvider businessUser={businessUser}>
        <BookingDialog />
      </BookingDialogProvider>
    </Dialog>
  );
}

const mapPageTypeToComponent: Record<PageType, any> = {
  addServices: AddServices,
  chooseDate: {},
  chooseServices: ChooseServices,
};

function BookingDialog() {
  const { title, currentPage } = useBookingDialogContext();

  const renderCurrentPage = () => {
    const Component = mapPageTypeToComponent[currentPage];
    return <Component />;
  };

  return (
    <DialogContent
      className="max-w-3xl space-y-6 overflow-clip max-h-[calc(100vh-10rem)] p-0"
      closeClassNames="right-5 top-0"
    >
      <DialogHeader className="bg-background p-6 pb-0">
        <DialogTitle>
          <div className="inline-flex gap-4 items-center">
            <PackagePlus
              className="h-9 w-9 text-foreground/70"
              strokeWidth={1.5}
            />
            <span className="font-medium text-xl">{title}</span>
          </div>
        </DialogTitle>
      </DialogHeader>
      {renderCurrentPage()}
    </DialogContent>
  );
}

function BookingDialogFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary">
      <div className="p-6">{children}</div>
    </div>
  );
}

interface ScrollableAreaProps {
  children: React.ReactNode;
  className?: string;
}
function ScrollableArea({ children, className }: ScrollableAreaProps) {
  return (
    <ScrollArea>
      <div
        className={cn(
          "max-h-[32rem] max-sm:max-h-[20rem] flex flex-col gap-4",
          className
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
}

function AddServices() {
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
            <span className="inline-flex gap-3">
              <Wallet2 className="text-primary-foreground/70" />
              <p
                className={cn({
                  "text-primary-foreground": true,
                  "text-primary-foreground/70": !services.length,
                })}
              >
                {formattedTotalCost}
              </p>
            </span>
            <span className="inline-flex gap-3">
              <Clock className="text-primary-foreground/70" />
              <p
                className={cn({
                  "text-primary-foreground": true,
                  "text-primary-foreground/70": !services.length,
                })}
              >
                {formattedTotalWait}
              </p>
            </span>
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

function ChooseServices() {
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
