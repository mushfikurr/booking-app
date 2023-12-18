import { Suspense } from "react";
import { ServiceCard } from "./ServiceCard";
import { Service } from "@prisma/client";
import { ViewAllContent } from "./ViewAllContentDialog";

const dummyServices: Service[] = [
  {
    id: "1",
    name: "Haircut",
    description: "Standard haircut service",
    price: "25.00",
    estimatedTime: 30,
    businessUserId: "businessUser1",
  },
  {
    id: "2",
    name: "Manicure",
    description: "Basic manicure service",
    price: "15.00",
    estimatedTime: 45,
    businessUserId: "businessUser2",
  },
  {
    id: "3",
    name: "Massage",
    description: "Relaxing massage service",
    price: "50.00",
    estimatedTime: 60,
    businessUserId: "businessUser1",
  },
];

export function ServicesDisplay() {
  const serviceCards = dummyServices.map((service) => (
    <ServiceCard key={service.id} {...service} />
  ));

  return (
    <div className="space-y-3">
      <span className="inline-flex items-center justify-between w-full">
        <h2 className="font-medium text-2xl">Services</h2>
        <ViewAllContent title="All services" children={serviceCards} />
      </span>
      <Suspense>
        <div className="flex flex-col gap-3.5">{serviceCards}</div>
      </Suspense>
    </div>
  );
}
