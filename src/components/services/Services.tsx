import { db } from "@/lib/db";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewServiceForm from "./NewServiceForm";
import ServicesDisplay from "./ServicesDisplay";
import { Suspense } from "react";
import FullPageSkeleton from "../FullPageSkeleton";

export default async function Services({
  user,
}: {
  user: UserWithBusinessUser;
}) {
  const services = await db.service.findMany({
    where: { businessUserId: user?.businessUser.id },
  });

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="space-y-3">
        <div className="flex gap-12 items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Services</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 items-center font-semibold leading-none">
                <Plus className="h-5 w-5 text-primary-foreground" />
                <p className="translate-y-[0px] text-xs">Add service</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new service</DialogTitle>
                <DialogDescription>
                  This allows you to advertise your services for bookings, and
                  name a price for your services.
                </DialogDescription>
              </DialogHeader>
              <NewServiceForm businessUser={user.businessUser} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Suspense fallback={<FullPageSkeleton />}>
        <ServicesDisplay
          prefetchedServicesData={services}
          businessUserId={user?.businessUser.id}
        />
      </Suspense>
    </div>
  );
}
