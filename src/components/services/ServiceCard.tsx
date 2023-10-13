import { Service } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { Clock, Pencil, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateServiceForm from "./UpdateServiceForm";
const humanizeDuration = require("humanize-duration");

export function ServiceCard({
  service,
  isLoading,
}: {
  service: Service;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <ServiceCardLoading />;
  }

  const displayedPrice = parseFloat(service.price);
  const displayedEstimatedTime = humanizeDuration(service.estimatedTime * 1000);

  return (
    <div className="border border-border rounded-lg drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="p-6 h-full flex flex-col justify-center space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold tracking-wide max-w-[150px]">
              {service.name}
            </h3>
            {service.price && (
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            <div className="rounded-sm">
              <h2 className="text-xl font-medium">£{displayedPrice}</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-3 items-center">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {displayedEstimatedTime}
            </p>
          </span>
          <div className="bg-accent rounded-md flex text-muted-foreground border border-border">
            <EditCardTrigger service={service} />
            <Separator orientation="vertical" />
            <button className="hover:text-destructive hover:bg-background rounded-r-md transition duration-200 ease-in-out">
              <Trash className="h-4 w-4 mx-3 my-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditCardTrigger({ service }: { service: Service }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="hover:text-foreground hover:bg-background rounded-l-md transition duration-200 ease-in-out cursor-pointer">
            <Pencil className="h-4 w-4 mx-3 my-2" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editing {service.name}</DialogTitle>
          </DialogHeader>
          <UpdateServiceForm service={service} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ServiceCardLoading() {
  return (
    <Skeleton className="border border-border rounded-lg drop-shadow-sm animate-pulse">
      <div className="flex justify-between items-center p-6 h-full">
        <div className="flex flex-col justify-center">
          <h3 className="hidden text-sm font-semibold tracking-wide max-w-[150px]">
            Placeholder
          </h3>
          <p className="hidden text-muted-foreground text-sm">Description</p>
        </div>
        <div className="flex gap-1">
          <div className="p-2 rounded-sm">
            <h2 className="hidden text-xl font-medium">£20</h2>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
