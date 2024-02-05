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
import autoAnimate from "@formkit/auto-animate";
import { BusinessUser, Service } from "@prisma/client";
import { ScissorsLineDashed } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PropsWithChildren, forwardRef, useEffect, useRef } from "react";
import { ChooseServices } from "./(dialogPages)/AddServices";
import ChooseSlot from "./(dialogPages)/ChooseSlot";
import { AddServices } from "./(dialogPages)/InitialViewService";
import { ReviewBooking } from "./(dialogPages)/ReviewBooking";
import { BackButton } from "./BackButton";
import {
  BookingDialogProvider,
  PageType,
  useBookingDialogContext,
} from "./BookingDialogContext";
import { Statistics } from "./Statistics";

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

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
    <BookingDialogProvider businessUser={businessUser} service={service}>
      <DialogConsumer>{children}</DialogConsumer>
    </BookingDialogProvider>
  );
}

function DialogConsumer({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useBookingDialogContext();
  const session = useSession();
  const sessionStatus = session.status;

  if (sessionStatus === "unauthenticated") {
    return (
      <StartBookingUnauthenticated>{children}</StartBookingUnauthenticated>
    );
  } else if (sessionStatus === "authenticated") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <BookingDialog />
      </Dialog>
    );
  }
}

const StartBookingUnauthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Link href="/login">{children}</Link>;
};

export const mapPageTypeToComponent: Map<PageType, any> = new Map([
  ["addServices", AddServices],
  ["chooseDate", ChooseSlot],
  ["chooseServices", ChooseServices],
  ["reviewBooking", ReviewBooking],
]);

function BookingDialog() {
  const { title, currentPage } = useBookingDialogContext();

  const renderCurrentPage = () => {
    const Component = mapPageTypeToComponent.get(currentPage);
    return <Component />;
  };

  return (
    <DialogContent
      className="max-w-4xl space-y-3 overflow-y-scroll max-h-screen p-0"
      closeClassNames="right-5 top-2"
    >
      <DialogHeader className="bg-background p-6 pb-0">
        <DialogTitle>
          <div className="inline-flex gap-4 items-center">
            <ScissorsLineDashed className="h-7 w-7 block max-sm:hidden" />
            <span className="font-medium text-xl">{title}</span>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="min-h-fit">{renderCurrentPage()}</div>
    </DialogContent>
  );
}

interface BookingDialogFooterProps {
  services?: Service[];
  children?: React.ReactNode;
}

export function BookingDialogFooter({
  children,
  ...props
}: BookingDialogFooterProps) {
  return (
    <div className="border-t">
      <div className="px-6 py-3 flex justify-between">
        <BackButton />
        {props.services && <Statistics services={props.services} />}
        {children}
      </div>
    </div>
  );
}

interface ScrollableAreaProps {
  children: React.ReactNode;
  className?: string;
}
export const ScrollableArea = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ScrollableAreaProps>
>(({ children, className }: ScrollableAreaProps, forwardedRef) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollAreaRef.current && autoAnimate(scrollAreaRef.current);
  }, [scrollAreaRef]);

  return (
    <ScrollArea ref={forwardedRef}>
      <div
        className={cn(
          "max-h-[32rem] max-sm:max-h-[calc(100vh-18rem)] flex flex-col gap-4",
          className
        )}
        ref={scrollAreaRef}
      >
        {children}
      </div>
    </ScrollArea>
  );
});
