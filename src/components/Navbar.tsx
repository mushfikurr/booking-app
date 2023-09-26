import { UserCircle2 } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-fit0 z-[10] py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center h-full">
          <p className="font-medium text-lg">BookingApp.</p>
        </div>

        <Button
          variant="ghost"
          className="flex justify-center items-center gap-2"
        >
          <UserCircle2 className="h-4 w-4 text-foreground" />
          <p className="text-sm font-light text-foreground">Login</p>
        </Button>
      </div>
    </div>
  );
}
