"use client";

import { ScrollableArea } from "@/app/business/[profileId]/(components)/BookingDialog";
import { ServiceCardRoot } from "@/app/business/[profileId]/(components)/ServiceCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookingsForBusiness";
import { getHMFromDateTime } from "@/lib/utils";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Clock, Loader2, MoreHorizontal, Scaling, X } from "lucide-react";

interface ActionsDropdownProps {
  booking: BookingIncludesUserAndServices;
}
export function ActionsDropdown({ booking }: ActionsDropdownProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const bookingMutation = useMutation({
    mutationFn: async () => {
      return await axios.post("/api/booking/remove", { id: booking.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast({
        title: "Successfully removed booking",
      });
    },
    onError: (resp: AxiosError) => {
      const error =
        resp.response?.status === 404
          ? (resp.response?.data as any).error
          : undefined;

      toast({
        variant: "destructive",
        title: "Error removing booking",
        description: error ?? resp.response?.statusText,
      });
    },
  });

  const displayLoadingIcon = (
    originalIcon: React.ReactNode,
    isLoading: boolean
  ) => {
    return isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin text-foreground/60" />
    ) : (
      originalIcon
    );
  };

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger className="w-full" asChild>
              <DropdownMenuItem className="gap-2">
                <Scaling
                  className="h-4 w-4 text-foreground/60"
                  strokeWidth={1.8}
                />
                View
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />

            <AlertDialogTrigger className="w-full" asChild>
              <DropdownMenuItem className="text-destructive gap-2 font-medium">
                {displayLoadingIcon(
                  <X className="h-4 w-4 text-destructive/60" />,
                  bookingMutation.isLoading
                )}
                Cancel
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <CancelBookingAlert bookingMutation={bookingMutation} />
      </AlertDialog>
      <ViewDialog booking={booking} />
    </Dialog>
  );
}

interface CancelBookingAlertProps {
  bookingMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
}
function CancelBookingAlert({ bookingMutation }: CancelBookingAlertProps) {
  const handleContinue = () => {
    bookingMutation.mutate();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you wish to cancel this booking?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently cancel the
          booking, meaning the client will not able to attend.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleContinue}
          isLoading={bookingMutation.isLoading}
        >
          Cancel booking
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

interface ViewDialogProps {
  booking: BookingIncludesUserAndServices;
}
function ViewDialog(props: ViewDialogProps) {
  const booking = props.booking;
  const bookingStatistics = useBookingStatistics(props.booking.services);
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const formatted = `${getHMFromDateTime(startDate)} - ${getHMFromDateTime(
    endDate
  )}`;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{booking.user.name}&apos;s booking</DialogTitle>
      </DialogHeader>
      <ScrollableArea>
        <div className="space-y-2">
          <span className="inline-flex gap-3 items-center">
            <Clock className="text-foreground h-5 w-5" />
            <h1 className="text-lg">{formatted}</h1>
          </span>
          <h3 className="font-medium text-lg">Services</h3>
          <div className="space-y-2">
            {booking.services.map((s) => {
              return <ServiceCardRoot key={s.id} service={s} />;
            })}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Totals</h3>
          <div className="flex gap-2 flex-wrap text-sm">
            <div className="border-border border rounded-sm p-2 px-3 w-fit">
              <p>{bookingStatistics.totalCost}</p>
            </div>
            <div className="border-border border rounded-sm p-2 px-3 w-fit">
              <p>{bookingStatistics.totalWait}</p>
            </div>
          </div>
        </div>
      </ScrollableArea>
    </DialogContent>
  );
}
