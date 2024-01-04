import { Check, Contact2, MapPin, Smartphone } from "lucide-react";
import { usePageContext } from "./BusinessRegisterPageContext";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Stepper() {
  const { currentPage, allFormValues, seekPage } = usePageContext();

  const stepperIconClassNames = "h-6 w-6";
  const STEPS = [
    {
      displayName: "Personal details",
      icon: <Contact2 className={stepperIconClassNames} />,
    },
    {
      displayName: "Contact details",
      icon: <Smartphone className={stepperIconClassNames} />,
    },
    {
      displayName: "Location",
      icon: <MapPin className={stepperIconClassNames} />,
    },
    {
      displayName: "Review",
      icon: <Check className={stepperIconClassNames} />,
    },
  ];

  const completeVariant =
    "bg-primary text-primary-foreground group-hover:text-primary-foreground/80";
  const inProgressVariant =
    "text-foreground/80 border-secondary-foreground bg-secondary";

  const stepperIcon = (
    icon: ReactNode,
    displayName: string,
    currentIndex: number
  ) => {
    if (currentIndex + 1 === currentPage) {
      return (
        <>
          <div
            className={cn(
              "rounded-full p-3 ml-3 text-secondary-foreground/60 transition duration-150 ease-in-out group-hover:text-foreground/80",
              inProgressVariant
            )}
          >
            {icon}
          </div>
          <p
            className={cn(
              "text-foreground/60 text-sm group-hover:text-foreground/80 transition duration-150 ease-in-out select-none hidden md:block",
              "text-foreground/80"
            )}
          >
            {displayName}
          </p>
        </>
      );
    } else if (allFormValues[currentIndex]) {
      return (
        <>
          <div
            className={cn(
              "rounded-full p-3 ml-3 text-secondary-foreground/60 transition duration-150 ease-in-out group-hover:text-foreground/80",
              completeVariant
            )}
          >
            {icon}
          </div>
          <p
            className={cn(
              "text-foreground/60 text-sm group-hover:text-foreground/80 transition duration-150 ease-in-out select-none hidden md:block",
              "text-foreground"
            )}
          >
            {displayName}
          </p>
        </>
      );
    } else {
      return (
        <>
          <div
            className={cn(
              "rounded-full p-3 ml-3 text-secondary-foreground/60 transition duration-150 ease-in-out group-hover:text-foreground/80"
            )}
          >
            {icon}
          </div>
          <p
            className={cn(
              "text-foreground/60 text-sm group-hover:text-foreground/80 transition duration-150 ease-in-out select-none hidden md:block"
            )}
          >
            {displayName}
          </p>
        </>
      );
    }
  };

  return (
    <div className="hidden sm:flex flex-col pl-3 pr-6 py-8 rounded-md h-fit mb-4 w-fit overflow-clip px-4">
      <div className="flex flex-col gap-8 w-full relative">
        {STEPS.map((page, idx) => (
          <div
            key={page.displayName}
            onClick={() => {
              seekPage(idx + 1);
            }}
            className={`flex flex-row-reverse items-center animate-in fade-in slide-in-from-right-2 duration-200 ease-in-out group`}
          >
            {stepperIcon(page.icon, page.displayName, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}
