import { useBookingStatistics } from "@/lib/hooks/useBookingStatistics";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
import { Clock, LucideIcon, Wallet2 } from "lucide-react";

export function Statistics({ services }: { services: Service[] }) {
  const statisticClassNames = {
    "text-sm transition duration-200 ease-in-out": true,
    "text-primary": services.length,
    "text-primary/70": !services.length,
  };
  const { totalCost, totalWait } = useBookingStatistics(services);

  return (
    <div className="flex items-center gap-6 select-none">
      <Statistic Icon={Wallet2} className={cn(statisticClassNames)}>
        {totalCost}
      </Statistic>
      <Statistic Icon={Clock} className={cn(statisticClassNames)}>
        {totalWait}
      </Statistic>
    </div>
  );
}

interface StatisticProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}
function Statistic({ Icon, children, className }: StatisticProps) {
  return (
    <span className="inline-flex gap-3 items-center">
      <Icon className="text-primary/70 text-md" />
      <p className={cn(className)}>{children}</p>
    </span>
  );
}
