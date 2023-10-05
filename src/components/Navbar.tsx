"use client";

import { cn } from "@/lib/utils";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavbarAuthenticated } from "./NavbarAuthenticated";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

function NavbarWithProvider() {
  const { status, data } = useSession();
  if (status === "authenticated" && data.user) {
    return (
      <NavbarAuthenticated
        name={data.user.name}
        email={data.user.email}
        image={data.user.image}
      />
    );
  }
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-background z-[10] py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center h-full">
          <Link className="hover:text-primary transition ease-in-out" href="/">
            <p className="font-medium text-lg tracking-tighter">BookingApp.</p>
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

export default function Navbar() {
  return (
    <SessionProvider>
      <NavbarWithProvider />
    </SessionProvider>
  );
}
