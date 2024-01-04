"use client";

import { Service } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import FullPageSkeleton from "../../../../../../components/FullPageSkeleton";
import { useToast } from "../../../../../../components/ui/use-toast";
import { ServiceCard } from "./ServiceCard";
import { getServices } from "@/lib/query/clientQuery";

function EmptyServices() {
  const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-4 relative animate-in fade-in duration-500 ease-out">
      {squares.map((squareNum) => (
        <div
          key={squareNum}
          className="h-full bg-accent/60 rounded-lg animate-in zoom-in-90 duration-500"
        />
      ))}
      <div className="absolute h-full w-full md:pb-20 flex md:items-center max-sm:pt-8 justify-center">
        <h3 className="text-md lg:text-xl tracking-tight text-foreground/50 select-none font-semibold text-center">
          There aren't any services at the moment.
        </h3>
      </div>
    </div>
  );
}

export default function ServicesDisplay({
  prefetchedServicesData,
  businessUserId,
}: {
  prefetchedServicesData: Service[];
  businessUserId: string;
}) {
  const { data, isLoading, isError } = useQuery(
    ["service"],
    async () => {
      return await getServices(businessUserId);
    },
    { initialData: prefetchedServicesData }
  );
  const { toast } = useToast();

  if (isError) {
    toast({ title: "Error getting services from the server." });
  }

  const services = data?.services;

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  if (services?.length === 0) {
    return <EmptyServices />;
  }

  return (
    <div className="grid grid-auto-fit-lg h-fit gap-6">
      {services?.map((service: Service, idx: number) => (
        <ServiceCard
          key={service.id}
          service={service}
          isLoading={isLoading}
          delayId={idx}
        />
      ))}
    </div>
  );
}
