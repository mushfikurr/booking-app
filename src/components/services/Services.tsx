import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { db } from "@/lib/db";
import { BusinessUser } from "@prisma/client";
import NewServiceForm from "./NewServiceForm";
import ServicesDisplay from "./ServicesDisplay";

export default async function Services({
  businessUser,
}: {
  businessUser: BusinessUser;
}) {
  const services = await db.service.findMany({
    where: { businessUserId: businessUser?.id },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="max-h-2xl">
        <Card className="max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
          <CardHeader>
            <CardTitle>Create a new service</CardTitle>
            <CardDescription>
              This allows you to advertise your services for bookings, and name
              a price for your services.{" "}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new service</DialogTitle>
                  <DialogDescription>
                    This allows you to advertise your services for bookings, and
                    name a price for your services.
                  </DialogDescription>
                </DialogHeader>
                <NewServiceForm businessUser={businessUser} />
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
      <div className="flex-grow grid grid-cols-3 grid-rows-3 gap-6 max-h-3xl">
        <ServicesDisplay
          prefetchedServicesData={services}
          businessUserId={businessUser.id}
        />
      </div>
    </div>
  );
}
