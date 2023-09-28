"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { DefaultSession } from "next-auth";

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
    <Link href={route}>
      <div className="flex justify-center items-center gap-1 group">
        <p
          className={cn(
            "text-sm transition-colors group-hover:text-foreground/80 text-foreground/60 ease-in-out",
            currentRoute === route && "text-foreground"
          )}
        >
          {displayName}
        </p>
      </div>
    </Link>
  );
};

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

        <div className="flex gap-10">
          <p>{name}</p>
        </div>
      </div>
    </div>
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

        <div className="flex gap-10">
          {links.map((link) => (
            <NavLink {...link} key={link.displayName} />
          ))}
        </div>
      </div>
    </div>
  );
}
