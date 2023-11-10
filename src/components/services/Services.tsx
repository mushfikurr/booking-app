import { db } from "@/lib/db";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import FullPageSkeleton from "../FullPageSkeleton";
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
        <div className="flex gap-12 items-baseline">
          <h1 className="text-2xl font-semibold tracking-tight">Services</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 items-center font-semibold leading-none p-3 py-2">
                <Plus className="h-4 w-4" />
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
