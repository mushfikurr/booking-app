"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC } from "react";
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
import { Separator } from "./ui/separator";
import { LogOut, User2 } from "lucide-react";

interface NavbarAuthenticatedProps {
  name: string;
  email: string;
  image: string;
}

export const NavbarAuthenticated: FC<NavbarAuthenticatedProps> = ({
  name,
  email,
  image,
}) => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit0 z-[10] py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center h-full">
          <Link className="hover:text-primary transition ease-in-out" href="/">
            <p className="font-medium text-lg">BookingApp.</p>
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center">
              <NavigationMenuTrigger>
                <div className="flex gap-3 items-center mr-2">
                  <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                    <AvatarImage alt={`${name}'s Profile Picture`} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="test-sm text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
                    {name}
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
      </div>
    </div>
  );
};

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

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-fit0 z-[10] py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center h-full">
          <Link className="hover:text-primary transition ease-in-out" href="/">
            <p className="font-medium text-lg">BookingApp.</p>
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavLink {...link} key={link.displayName} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
