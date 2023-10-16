"use client";

import Link from "next/link";
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
import { LogOut, User2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { DefaultSession } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import NavigationMenuDropdown from "./NavigationMenuDropdown";

interface NavigationMenuAuthenticatedProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

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

export const NavigationMenuAuthenticated = (user) => {
  const router = useRouter();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center">
          <NavigationMenuTrigger>
            <div className="flex gap-4 items-center mr-2">
              <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                <AvatarImage alt={`${user?.data?.name}'s Profile Picture`} />
                <AvatarFallback>
                  {user?.data?.name &&
                    user?.data?.name.split(" ")[0][0] +
                      (user?.data?.name.split(" ")[1][0] ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground font-semibold">
                  {user?.data?.name}
                </p>
                {user?.data?.isBusinessUser && (
                  <p className="uppercase text-primary text-xs">Business</p>
                )}
              </div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Display user settings here */}
            <NavigationMenuDropdown
              isBusinessUser={user?.data?.isBusinessUser}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
