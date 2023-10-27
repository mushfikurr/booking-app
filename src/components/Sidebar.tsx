"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Contact,
  GanttChart,
  Home,
  LucideIcon,
  MapPin,
  Menu,
  Scissors,
  Smartphone,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Toggle } from "./ui/toggle";

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
    HeaderIcon: Contact,
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

const BREAKPOINTS = { mobile: 640, tablet: 768, desktop: 1280 };

export default function Sidebar({
  condense,
  forceNoCondense,
}: {
  condense?: boolean;
  forceNoCondense?: boolean;
}) {
  const [condensedSidebar, setCondensedSidebar] = useState(condense ?? false);
  const isMobile = useMediaQuery("(max-width:640px)");

  useEffect(() => {
    if (isMobile && !forceNoCondense) {
      setCondensedSidebar(true);
    }
  }, [isMobile]);

  if (condensedSidebar) {
    return (
      <CondensedSidebar
        setCondensedSidebar={setCondensedSidebar}
        isMobile={isMobile}
      />
    );
  }

  return (
    <div className="bg-accent/50 min-w-[230px] max-w-sm space-y-6 w-full h-full z-1 min-h-screen overflow-hidden sticky top-0 left-0 pt-20">
      <div className="px-12 py-8 pb-0">
        <span className="flex justify-between gap-2 items-center">
          <h1 className="text-2xl font-bold tracking-tight leading-none">
            Dashboard
          </h1>
          <Button
            variant="ghost"
            onClick={() => setCondensedSidebar(true)}
            className="p-0"
          >
            <ChevronLeft className="text-muted-foreground hover:text-foreground transition duration-200 ease-in-out cursor-pointer" />
          </Button>
        </span>
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
            <h2 className="font-medium text-lg">{headerText}</h2>
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition duration-200 ease-in-out",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="transition-all overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
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
  const childrenTransitionClassnames =
    "group-hover:translate-x-1 transition duration-75 ease-in-out";

  const renderSelected = () => {
    if (isSelected) {
      return (
        <li className="flex gap-4 items-center bg-accent-foreground/5 text-foreground px-2 sm:px-8 rounded-sm py-2 transition duration-200 ease-in-out cursor-pointer leading-none group">
          <Icon className={cn(childrenTransitionClassnames)} />
          <p
            className={cn("text-sm font-medium", childrenTransitionClassnames)}
          >
            {title}
          </p>
        </li>
      );
    }
    return (
      <li className="flex gap-4 items-center hover:bg-accent-foreground/5 text-muted-foreground hover:text-foreground px-2 sm:px-8 rounded-sm py-2 transition duration-200 ease-in-out cursor-pointer leading-none group">
        <Icon className={cn(childrenTransitionClassnames)} />
        <p className={cn("text-sm font-medium", childrenTransitionClassnames)}>
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

function CondensedSidebar({
  isMobile,
  setCondensedSidebar,
}: {
  isMobile: boolean;
  setCondensedSidebar: (condensed: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center bg-accent/50 min-w-[4rem] max-w-[8rem] gap-8 h-full z-10 min-h-screen overflow-hidden sticky top-0 left-0 pt-20">
      {isMobile ? (
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" className="px-3 rounded-sm">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-accent">
            <div>
              <Sidebar condense={false} forceNoCondense={true} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Button variant="ghost" className="px-3 rounded-sm">
          <ChevronRight onClick={() => setCondensedSidebar(false)} />
        </Button>
      )}

      {SUBMENU_PROPS.map((submenu, idx) => (
        <>
          <CondensedSubmenu
            headerText={submenu.headerText}
            HeaderIcon={submenu.HeaderIcon}
            menuItems={submenu.menuItems}
            key={submenu.headerText}
          />
        </>
      ))}
    </div>
  );
}

function CondensedSubmenu({ HeaderIcon, headerText, menuItems }: SubmenuProps) {
  return (
    <div className="flex flex-col w-full items-center space-y-3">
      <HeaderIcon className="text-foreground/80" />
      <ul className="flex flex-col w-full items-center space-y-1 text-muted-foreground">
        {menuItems.map((menuItem) => (
          <CondensedSubmenuItem
            title={menuItem.title}
            Icon={menuItem.Icon}
            link={menuItem.link}
            key={menuItem.link}
          />
        ))}
      </ul>
    </div>
  );
}

function CondensedSubmenuItem({ title, Icon, link }: MenuItem) {
  const pathname = usePathname();
  const isSelected =
    link.split("/").splice(1).join() === pathname.split("/").splice(2).join();

  return (
    <Link href={"/dashboard/" + link} passHref>
      <Popover>
        <PopoverTrigger>
          <Toggle pressed={isSelected}>
            <Icon />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="text-sm w-fit" side="right" sideOffset={14}>
          {title}
        </PopoverContent>
      </Popover>
    </Link>
  );
}
