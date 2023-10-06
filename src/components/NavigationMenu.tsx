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
import { usePathname } from "next/navigation";

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
  console.log(user);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center">
          <NavigationMenuTrigger>
            <div className="flex gap-3 items-center mr-2">
              <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                <AvatarImage alt={`${user?.data?.name}'s Profile Picture`} />
                <AvatarFallback>
                  {user?.data?.name && user?.data?.name[0]}
                </AvatarFallback>
              </Avatar>
              <p className="test-sm text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                {user?.data?.name}
              </p>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Display user settings here */}
            <ul className="flex flex-col p-3 sm:w-[200px]">
              <NavigationMenuLink asChild>
                <Link
                  className={cn(
                    "block select-none space-y-1 rounded-sm p-2 leading-none text-foreground/80 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  )}
                  href="/profile"
                >
                  <div className="flex items-center gap-3 text-sm font-medium leading-none">
                    <User2 className="w-4 h-4" />
                    <p className="leading-snug">Profile</p>
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
                  }}
                >
                  <div className="flex items-center gap-3 text-sm font-medium leading-none">
                    <LogOut className="w-4 h-4" />
                    <p className="leading-snug">Logout</p>
                  </div>
                </button>
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
