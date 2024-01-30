"use client";

import { Sidebar, SubmenuProps } from "@/components/Sidebar";
import {
  Calendar,
  Clock,
  Contact,
  GanttChart,
  Home,
  MapPin,
  Scissors,
  Smartphone,
  User2,
} from "lucide-react";

const SUBMENU_PROPS: SubmenuProps[] = [
  {
    HeaderIcon: Home,
    headerText: "Home",
    menuItems: [
      { title: "Overview", Icon: GanttChart, link: "/dashboard/overview" },
      { title: "Bookings", Icon: Calendar, link: "/dashboard/bookings" },
      { title: "Services", Icon: Scissors, link: "/dashboard/services" },
    ],
  },
  {
    HeaderIcon: Contact,
    headerText: "Edit Profile",
    menuItems: [
      {
        title: "Personal",
        Icon: User2,
        link: "/dashboard/editProfile/personal",
      },
      {
        title: "Location",
        Icon: MapPin,
        link: "/dashboard/editProfile/location",
      },
      {
        title: "Contact",
        Icon: Smartphone,
        link: "/dashboard/editProfile/contact",
      },
      {
        title: "Opening Hours",
        Icon: Clock,
        link: "/dashboard/editProfile/openinghours",
      },
    ],
  },
];

export function SidebarWrapper() {
  return <Sidebar title="Dashboard" submenuData={SUBMENU_PROPS} />;
}
