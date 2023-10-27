import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteTabs } from "@/components/ui/tabs-with-route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  if (!user?.isBusinessUser) {
    redirect("/profile");
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="container flex-grow w-full flex flex-col gap-5 py-20 px-8 md:px-14 md:py-28">
        {/* <RouteTabs className="w-full flex flex-col gap-4 mb-16">
          {/* <TabsList className="grid grid-cols-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="editProfile">Edit Profile</TabsTrigger>
          </TabsList> */}
        {/* <Suspense fallback={<h1>Loading!!</h1>}>{children}</Suspense>
        </RouteTabs> */}
        {children}
      </div>
    </div>
  );
}
