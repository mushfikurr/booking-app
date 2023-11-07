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
      <Suspense>
        <div className="container flex-grow max-w-full flex flex-col gap-5 pt-20 px-8 md:px-12 md:pt-28 md:pb-14">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
