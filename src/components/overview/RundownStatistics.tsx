import { Clock, Settings2, Users } from "lucide-react";
import { Button } from "../ui/button";

export default function RundownStatistics() {
  return (
    <>
      <div className="rounded-sm border border-border p-1 gap-1 mt-1 flex items-center">
        <Clock className="h-5 w-5 text-muted-foreground mx-3" />
        <p className="text-foreground/80">
          Open from{" "}
          <span className="font-medium text-foreground">10:00AM - 6:00PM</span>
        </p>
        <Button variant="ghost" className="ml-auto px-3">
          <Settings2 className="ml-auto h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      <div className="rounded-sm border border-border p-1 gap-1 flex items-center">
        <Users className="h-5 w-5 text-muted-foreground mx-3" />
        <p className="text-foreground/80">
          Expecting{" "}
          <span className="font-medium text-foreground">6 customers</span>{" "}
        </p>
        <Button variant="ghost" className="ml-auto  px-3">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </>
  );
}
