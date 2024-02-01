import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MouseEvent, MouseEventHandler } from "react";
import { PageType, useBookingDialogContext } from "./BookingDialogContext";

interface NextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  nextPage: PageType;
}

export const NextButton = ({
  onClick,
  className,
  isLoading,
  children,
  nextPage,
  ...props
}: NextButtonProps) => {
  const ctx = useBookingDialogContext();

  const handleClick: MouseEventHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (onClick) {
      onClick(event);
      return;
    }
    ctx.setCurrentPageState(nextPage);
  };

  return (
    <Button
      isLoading={isLoading}
      size="lg"
      className={cn(className, "max-sm:px-5")}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};
