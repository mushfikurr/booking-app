"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BusinessUser, Service } from "@prisma/client";
import { PackagePlus } from "lucide-react";
import { AddServices } from "./(dialogPages)/InitialViewService";
import { ChooseServices } from "./(dialogPages)/AddServices";
import {
  BookingDialogProvider,
  PageType,
  useBookingDialogContext,
} from "./BookingDialogContext";
import { ChooseDate } from "./(dialogPages)/ChooseSlot";
import { ReviewBooking } from "./(dialogPages)/ReviewBooking";

interface StartBookingButtonProps {
  children: React.ReactNode;
  businessUser: BusinessUser;
  service?: Service;
}

export function StartBooking({
  children,
  businessUser,
  service,
}: StartBookingButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <BookingDialogProvider businessUser={businessUser} service={service}>
        <BookingDialog />
      </BookingDialogProvider>
    </Dialog>
  );
}

const mapPageTypeToComponent: Record<PageType, any> = {
  addServices: AddServices,
  chooseDate: ChooseDate,
  chooseServices: ChooseServices,
  reviewBooking: ReviewBooking,
};

function BookingDialog() {
  const { title, currentPage } = useBookingDialogContext();

  const renderCurrentPage = () => {
    const Component = mapPageTypeToComponent[currentPage];
    return <Component />;
  };

  return (
    <DialogContent
      className="max-w-3xl space-y-3 overflow-clip max-h-[calc(100vh-10rem)] max-sm:max-h-screen p-0"
      closeClassNames="right-5 top-2"
    >
      <DialogHeader className="bg-background p-6 pb-0">
        <DialogTitle>
          <div className="inline-flex gap-4 items-center">
            <PackagePlus
              className="h-9 w-9 text-foreground/70 block max-sm:hidden"
              strokeWidth={1.5}
            />
            <span className="font-medium text-xl">{title}</span>
          </div>
        </DialogTitle>
      </DialogHeader>
      {renderCurrentPage()}
    </DialogContent>
  );
}

export function BookingDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-t">
      <div className="px-6 p-4">{children}</div>
    </div>
  );
}

interface ScrollableAreaProps {
  children: React.ReactNode;
  className?: string;
}
export function ScrollableArea({ children, className }: ScrollableAreaProps) {
  return (
    <ScrollArea>
      <div
        className={cn(
          "max-h-[32rem] max-sm:max-h-[calc(100vh-18rem)] flex flex-col gap-4",
          className
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
}
