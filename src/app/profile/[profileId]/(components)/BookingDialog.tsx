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
import { BusinessUser } from "@prisma/client";
import { PackagePlus } from "lucide-react";
import { AddServices } from "./(dialogPages)/AddServices";
import { ChooseServices } from "./(dialogPages)/ChooseServices";
import {
  BookingDialogProvider,
  PageType,
  useBookingDialogContext,
} from "./BookingDialogContext";

interface StartBookingButtonProps {
  children: React.ReactNode;
  businessUser: BusinessUser;
}

export function StartBooking({
  children,
  businessUser,
}: StartBookingButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <BookingDialogProvider businessUser={businessUser}>
        <BookingDialog />
      </BookingDialogProvider>
    </Dialog>
  );
}

const mapPageTypeToComponent: Record<PageType, any> = {
  addServices: AddServices,
  chooseDate: {},
  chooseServices: ChooseServices,
};

function BookingDialog() {
  const { title, currentPage } = useBookingDialogContext();

  const renderCurrentPage = () => {
    const Component = mapPageTypeToComponent[currentPage];
    return <Component />;
  };

  return (
    <DialogContent
      className="max-w-3xl space-y-6 overflow-clip max-h-[calc(100vh-10rem)] p-0"
      closeClassNames="right-5 top-0"
    >
      <DialogHeader className="bg-background p-6 pb-0">
        <DialogTitle>
          <div className="inline-flex gap-4 items-center">
            <PackagePlus
              className="h-9 w-9 text-foreground/70"
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
    <div className="bg-primary">
      <div className="p-6">{children}</div>
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
          "max-h-[32rem] max-sm:max-h-[20rem] flex flex-col gap-4",
          className
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
}
