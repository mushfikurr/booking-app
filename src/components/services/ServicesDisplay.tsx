"use client";

import { Service } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { ServiceCard } from "./ServiceCard";
const humanizeDuration = require("humanize-duration");

const getServices = async (businessUserId: string) => {
  const resp = await axios.post("/api/service", { businessUserId });
  return resp.data;
};

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

  return (
    <>
      {services?.map((service: Service) => (
        <ServiceCard key={service.id} service={service} isLoading={isLoading} />
      ))}
    </>
  );
}
