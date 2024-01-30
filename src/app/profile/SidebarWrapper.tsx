"use client";

import { Sidebar, SubmenuProps } from "@/components/Sidebar";
import {
  Cog,
  Contact,
  ScissorsLineDashed,
  Stars,
  User2,
  UserSquare,
} from "lucide-react";

const SUBMENU_PROPS: SubmenuProps[] = [
  {
    HeaderIcon: Contact,
    headerText: "Manage",
    menuItems: [
      {
        title: "Bookings",
        Icon: ScissorsLineDashed,
        link: "/profile/bookings",
      },
      { title: "Reviews", Icon: Stars, link: "/profile/reviews" },
    ],
  },
  {
    HeaderIcon: User2,
    headerText: "Profile",
    menuItems: [
      { title: "Edit Details", Icon: UserSquare, link: "/profile/edit" },
      { title: "Settings", Icon: Cog, link: "/profile/settings" },
    ],
  },
];

export function SidebarWrapper() {
  return <Sidebar title="Profile" submenuData={SUBMENU_PROPS} />;
}
