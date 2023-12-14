"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import NavigationMenuDropdown from "./NavigationMenuDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

interface NavLinkProps {
  route: string;
  displayName: string;
}

const links: NavLinkProps[] = [
  { route: "/login", displayName: "Login" },
  { route: "/register", displayName: "Register" },
];

const NavLink: FC<NavLinkProps> = ({ route, displayName }) => {
  const currentRoute = usePathname();

  return (
    <NavigationMenuItem>
      <Link href={route} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "hover:text-foreground/80",
            currentRoute === route ? "text-foreground" : "text-foreground/60"
          )}
        >
          {displayName}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export function NavigationMenuUnauthenticated() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavLink {...link} key={link.displayName} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const NavigationMenuAuthenticated = ({
  user,
}: {
  user: Session["user"];
}) => {
  const userNameSplit = user?.name ? user?.name?.split(" ") : "";
  const initials =
    userNameSplit.length > 1
      ? userNameSplit[0][0] + userNameSplit[1][0]
      : userNameSplit[0][0];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center">
          <NavigationMenuTrigger>
            <div className="flex gap-4 items-center mr-2">
              <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                <AvatarImage alt={`${user?.name}'s Profile Picture`} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground font-semibold">
                  {user?.name}
                </p>
                {user?.isBusinessUser && (
                  <p className="uppercase text-primary text-xs">Business</p>
                )}
              </div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Display user settings here */}
            <NavigationMenuDropdown isBusinessUser={user?.isBusinessUser} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
