import { cn } from "@/lib/utils";
import { Activity, LogOut, LucideIcon, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NavigationMenuLink } from "./ui/navigation-menu";

const routes = [
  {
    Icon: User2,
    title: "Profile",
    href: "/profile",
  },
  {
    Icon: LogOut,
    title: "Logout",
    handleClick: () => {
      signOut();
      redirect("/");
    },
  },
];

const businessRoutes = [
  { Icon: Activity, title: "Dashboard", href: "/dashboard/overview" },
  ...routes.slice(1),
];

const renderNavigationItem = (route: any) => {
  if ("href" in route)
    return (
      <NavigationMenuDropdownLink
        {...(route as NavigationMenuDropdownLinkProps)}
      />
    );
  else
    return (
      <NavigationMenuDropdownButton
        {...(route as NavigationMenuDropdownButtonProps)}
      />
    );
};

export default function NavigationMenuDropdown({
  isBusinessUser,
}: {
  isBusinessUser: boolean;
}) {
  const routesToDisplay = isBusinessUser ? businessRoutes : routes;
  const displayedRoutes = routesToDisplay.map((route) =>
    renderNavigationItem(route)
  );

  return <ul className="flex flex-col p-3 sm:w-[260px]">{displayedRoutes}</ul>;
}

interface NavigationMenuDropdownItem {
  Icon: LucideIcon;
  title: string;
}

interface NavigationMenuDropdownLinkProps extends NavigationMenuDropdownItem {
  href: string;
}
function NavigationMenuDropdownLink({
  Icon,
  title,
  href,
}: NavigationMenuDropdownLinkProps) {
  return (
    <NavigationMenuLink asChild>
      <Link
        className={cn(
          "block select-none space-y-1 rounded-sm p-2 leading-none text-foreground/80 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
        href={href}
      >
        <div className="flex items-center gap-3 text-sm font-medium leading-none">
          <Icon className="w-4 h-4" />
          <p className="leading-snug">{title}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

interface NavigationMenuDropdownButtonProps extends NavigationMenuDropdownItem {
  handleClick: () => void;
}
function NavigationMenuDropdownButton({
  Icon,
  title,
  handleClick,
}: NavigationMenuDropdownButtonProps) {
  return (
    <NavigationMenuLink asChild>
      <button
        className={cn(
          "block select-none space-y-1 rounded-sm p-2 leading-none text-foreground/80 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3 text-sm font-medium leading-none">
          <LogOut className="w-4 h-4" />
          <p className="leading-snug">Logout</p>
        </div>
      </button>
    </NavigationMenuLink>
  );
}
