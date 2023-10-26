"use client";

import {
  Calendar,
  ChevronDown,
  GanttChart,
  Home,
  Scissors,
  LucideIcon,
  ChevronUp,
  User2,
  MapPin,
  Smartphone,
  Clock,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuItem {
  title: string;
  Icon: LucideIcon;
  link: string;
}

interface SubmenuProps {
  HeaderIcon: LucideIcon;
  headerText: string;
  menuItems: MenuItem[];
}

const SUBMENU_PROPS: SubmenuProps[] = [
  {
    HeaderIcon: Home,
    headerText: "Home",
    menuItems: [
      { title: "Overview", Icon: GanttChart, link: "/overview" },
      { title: "Bookings", Icon: Calendar, link: "/bookings" },
      { title: "Services", Icon: Scissors, link: "/services" },
    ],
  },
  {
    HeaderIcon: User2,
    headerText: "Edit Profile",
    menuItems: [
      { title: "Personal", Icon: User2, link: "/editProfile/personal" },
      { title: "Location", Icon: MapPin, link: "/editProfile/location" },
      { title: "Contact", Icon: Smartphone, link: "/editProfile/contact" },
      {
        title: "Opening Hours",
        Icon: Clock,
        link: "/editProfile/openingHours",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="bg-accent max-w-xs space-y-6 w-full h-full z-1 min-h-screen overflow-hidden sticky top-0 left-0 pt-20">
      <div className="px-12 py-8 pb-0">
        <h1 className="text-2xl font-bold tracking-tight leading-none">
          Dashboard
        </h1>
      </div>
      {SUBMENU_PROPS.map((submenu) => (
        <Submenu
          headerText={submenu.headerText}
          HeaderIcon={submenu.HeaderIcon}
          menuItems={submenu.menuItems}
          key={submenu.headerText}
        />
      ))}
    </div>
  );
}

function Submenu({ HeaderIcon, headerText, menuItems }: SubmenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
      className="space-y-3 w-full h-full"
    >
      <CollapsibleTrigger className="w-full h-full px-12">
        <div className="flex w-full items-center justify-between h-full">
          <span className="flex items-center gap-5">
            <h2 className="font-semibold text-lg">{headerText}</h2>
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition duration-200 ease-in-out",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="space-y-2 mx-4">
          {menuItems.map((menuItem) => (
            <SubmenuItem
              title={menuItem.title}
              Icon={menuItem.Icon}
              link={menuItem.link}
              key={menuItem.link}
            />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SubmenuItem({ title, Icon, link }: MenuItem) {
  const pathname = usePathname();
  const isSelected =
    link.split("/").splice(1).join() === pathname.split("/").splice(2).join();

  const renderSelected = () => {
    if (isSelected) {
      return (
        <li className="flex gap-4 items-center bg-accent-foreground/10 text-foreground px-8 rounded-sm py-2 transition duration-200 ease-in-out cursor-pointer leading-none group">
          <Icon className="group-hover:translate-x-1 transition duration-200 ease-in-out" />
          <p className="text-sm font-semibold group-hover:translate-x-1 transition duration-150 ease-in-out">
            {title}
          </p>
        </li>
      );
    }
    return (
      <li className="flex gap-4 items-center hover:bg-accent-foreground/10 text-muted-foreground hover:text-foreground px-8 rounded-sm py-2 transition duration-200 ease-in-out cursor-pointer leading-none group">
        <Icon className="group-hover:translate-x-1 transition duration-200 ease-in-out" />
        <p className="text-sm font-medium group-hover:translate-x-1 transition duration-150 ease-in-out">
          {title}
        </p>
      </li>
    );
  };

  return (
    <>
      <Link href={"/dashboard/" + link} passHref>
        {renderSelected()}
      </Link>
    </>
  );
}
