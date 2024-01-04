import NewServiceForm from "@/app/dashboard/(tabs)/(home)/services/(components)/NewServiceForm";
import ServicesDisplay from "@/app/dashboard/(tabs)/(home)/services/(components)/ServicesDisplay";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/db";
import { getUserWithBusinessData } from "@/lib/query/serverQuery";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ServicesPage() {
  const user = await getUserWithBusinessData();
  if (!user?.businessUser) {
    redirect("/login");
  }
  const services = await db.service.findMany({
    where: { businessUserId: user.businessUser.id },
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

      <Suspense fallback={<LoadingSkeleton className="h-full" />}>
        <ServicesDisplay
          prefetchedServicesData={services}
          businessUserId={user.businessUser.id}
        />
      </Suspense>
    </div>
  );
}
