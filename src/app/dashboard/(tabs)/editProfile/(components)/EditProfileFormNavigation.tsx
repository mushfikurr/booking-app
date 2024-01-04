"use client";

import { Building2, Clock4, Smartphone, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../../../components/ui/navigation-menu";

const ActiveLink = ({
  icon,
  displayName,
  route,
  editPage,
}: {
  icon: ReactNode;
  displayName: string;
  route: string;
  editPage?: string;
}) => {
  const editPageWithDefault = editPage ?? "personal";
  if (route === editPageWithDefault) {
    return (
      <Link
        key={route}
        href={`/dashboard/editProfile/${route}`}
        legacyBehavior
        passHref
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <span className="flex gap-3 items-center text-sm">
            {icon}
            {displayName}
          </span>
        </NavigationMenuLink>
      </Link>
    );
  } else {
    return (
      <Link
        key={route}
        href={`/dashboard/editProfile/${route}`}
        legacyBehavior
        passHref
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <span className="flex gap-3 items-center text-sm text-muted-foreground">
            {icon}
            {displayName}
          </span>
        </NavigationMenuLink>
      </Link>
    );
  }
};

export default function EditFormNavigation({
  editPage,
}: {
  editPage?: string;
}) {
  const EDIT_FORM_LINKS = [
    {
      displayName: "Personal",
      route: "personal",
      icon: <User className="h-4 w-4" />,
    },
    {
      displayName: "Location",
      route: "location",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      displayName: "Contact",
      route: "contact",
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      displayName: "Opening Hours",
      route: "openinghours",
      icon: <Clock4 className="h-4 w-4" />,
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {EDIT_FORM_LINKS.map((link) => {
            return <ActiveLink key={link.route} {...{ ...link, editPage }} />;
          })}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
