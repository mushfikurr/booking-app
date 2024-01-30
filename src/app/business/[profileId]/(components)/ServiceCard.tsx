"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BusinessUser, Service } from "@prisma/client";
import { X } from "lucide-react";
import { useState } from "react";
import { StartBooking } from "./BookingDialog";
const humanizeDuration = require("humanize-duration");

interface ServiceCardRootProps {
  children?: React.ReactNode;
  className?: string;
  borderClassname?: string;
  handleClick?: () => void;
  service: Service;
}

export function ServiceCardRoot({
  children,
  service,
  className,
  borderClassname,
  handleClick,
}: ServiceCardRootProps) {
  const { name, price, estimatedTime, description } = service;
  const displayedEstimatedTime = humanizeDuration(estimatedTime * 1000);
  const Component = handleClick ? "button" : "div";

  return (
    <Component
      className={cn(
        "flex items-stretch min-w-full drop-shadow-sm",
        "max-sm:flex-col",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        if (handleClick) handleClick();
      }}
    >
      <div
        className={cn(
          "flex flex-col justify-center bg-primary text-primary-foreground rounded-l-lg items-end px-4 py-4 min-w-[110px]",
          "max-sm:rounded-t-lg max-sm:rounded-b-none max-sm:py-4 max-sm:gap-3 max-sm:flex-row max-sm:items-start max-sm:justify-between max-sm:px-6"
        )}
      >
        <h3 className="text-sm font-semibold leading-tighter">£{price}</h3>
        <p className="text-sm text-primary-foreground/80 truncate">
          {displayedEstimatedTime}
        </p>
      </div>
      <div
        className={cn(
          "grow flex flex-col justify-center items-start px-4 py-4 border-t border-r border-border border-b rounded-r-lg",
          "transition duration-150 ease-in-out",
          borderClassname,
          "max-sm:py-4 max-sm:border-l"
        )}
      >
        <h3 className="text-sm">{name}</h3>
        <p className="max-sm:line-clamp-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </Component>
  );
}

interface CustomServiceCardProps {
  service: Service;
  handleClick?: () => void;
}

interface BookingServiceCardProps extends CustomServiceCardProps {
  businessUser: BusinessUser;
}

export function BookingServiceCard({
  service,
  handleClick,
  ...props
}: BookingServiceCardProps) {
  return (
    <ServiceCardRoot
      service={service}
      borderClassname={cn("rounded-r-none", "max-sm:border-l")}
    >
      <StartBooking businessUser={props.businessUser} service={service}>
        <button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-[inherit] px-8 rounded-r-lg border-border border border-l-0 rounded-l-none text-sm font-normal",
            "max-sm:border max-sm:border-border max-sm:rounded-l-lg max-sm:rounded-t-none max-sm:border-t-0 max-sm:py-4"
          )}
          onClick={handleClick}
        >
          Book
        </button>
      </StartBooking>
    </ServiceCardRoot>
  );
}

interface SelectableServiceCardProps extends CustomServiceCardProps {
  selected?: boolean;
}

export function SelectableServiceCard({
  service,
  handleClick,
  selected,
}: SelectableServiceCardProps) {
  const customSelected = selected ?? false;
  const [cardSelected, setCardSelected] = useState(customSelected);

  const handleSelect = () => {
    setCardSelected(!cardSelected);
    if (handleClick) handleClick();
  };

  return (
    <ServiceCardRoot
      service={service}
      handleClick={handleSelect}
      borderClassname={cn({
        "max-sm:border max-sm:rounded-md max-sm:rounded-t-none": true,
        "hover:border-secondary-foreground/40": !selected,
        "border-secondary-foreground": selected,
      })}
    />
  );
}

export function RemovableServiceCard({
  handleClick,
  service,
}: CustomServiceCardProps) {
  return (
    <ServiceCardRoot service={service} borderClassname="rounded-r-none">
      <button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-[inherit] px-8 rounded-r-lg border-border border border-l-0 rounded-l-none text-sm font-normal",
          "max-sm:border max-sm:border-border max-sm:rounded-l-lg max-sm:rounded-t-none max-sm:border-t-0 max-sm:py-4"
        )}
        onClick={handleClick}
      >
        <X className="h-4 w-4" />
      </button>
    </ServiceCardRoot>
  );
}
