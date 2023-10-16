import Link from "next/link";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NavigationMenuDropdown({
  isBusinessUser,
}: {
  isBusinessUser: boolean;
}) {
  return (
    <ul className="flex flex-col p-3 sm:w-[200px]">
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-sm p-2 leading-none text-foreground/80 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          href={isBusinessUser ? "/dashboard/overview" : "/profile"}
        >
          <div className="flex items-center gap-3 text-sm font-medium leading-none">
            <User2 className="w-4 h-4" />
            <p className="leading-snug">
              {isBusinessUser ? "Dashboard" : "Profile"}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
      <Separator className="my-2" />
      <NavigationMenuLink asChild>
        <button
          className={cn(
            "block select-none space-y-1 rounded-sm p-2 leading-none text-foreground/80 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          onClick={() => {
            signOut();
            redirect("/");
          }}
        >
          <div className="flex items-center gap-3 text-sm font-medium leading-none">
            <LogOut className="w-4 h-4" />
            <p className="leading-snug">Logout</p>
          </div>
        </button>
      </NavigationMenuLink>
    </ul>
  );
}
