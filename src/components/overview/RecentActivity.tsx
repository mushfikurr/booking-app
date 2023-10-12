import { Activity } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="max-w-xs border-border bg-muted border drop-shadow-sm px-6 py-4 rounded-md">
      <div className="flex justify-between flex-grow">
        <div className="flex gap-2 w-full justify-between">
          <div>
            <p className="text-md font-semibold text-muted-foreground">
              Recent Activity
            </p>
            <p className="text-sm text-muted-foreground leading-tight">
              Customers that have recently interacted with your business
            </p>
          </div>
          <Activity className="text-foreground/60" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground font-semibold">
          No recent activity.
        </p>
      </div>
    </div>
  );
}
