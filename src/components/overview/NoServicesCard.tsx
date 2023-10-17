"use client";

import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Service } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const getServices = async (businessUserId?: string) => {
  const resp = await axios.post("/api/service", { businessUserId });
  return resp.data;
};

export default function NoServicesCard({
  prefetchedServicesData,
  businessUserId,
}: {
  prefetchedServicesData: Service[];
  businessUserId?: string;
}) {
  const { data } = useQuery(
    ["service"],
    async () => {
      return await getServices(businessUserId);
    },
    { initialData: prefetchedServicesData }
  );

  const router = useRouter();

  if (data?.services?.length === 0) {
    return (
      <Card className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
        <CardHeader className="pb-2 space-y-1">
          <CardTitle>
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight w-full">Create a new service</h3>
              <AlertCircle className="text-foreground h-7 w-7" />
            </div>
          </CardTitle>
          <CardDescription>Required for business accounts</CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm max-w-xs text-foreground/80">
            Showcase what you can provide to a customer, and name a price the
            customer can expect.{" "}
          </p>
          <p className="text-sm max-w-xs font-medium text-destructive">
            This is required for the booking process.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              router.push("/dashboard/services");
            }}
          >
            Navigate to services
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
