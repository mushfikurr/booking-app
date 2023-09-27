import { UserCircle2 } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-fit0 z-[10] py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center h-full">
          <Link href="/">
            <p className="font-medium text-lg">BookingApp.</p>
          </Link>
        </div>

        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/login"
        >
          <div className="flex justify-center items-center gap-2">
            <UserCircle2 className="h-4 w-4 text-foreground" />
            <p className="text-sm text-foreground">Login</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
