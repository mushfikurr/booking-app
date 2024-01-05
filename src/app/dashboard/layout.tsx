import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions } from "../(auth)/AuthOptions";

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
    <div className="flex min-h-screen">
      <Sidebar />
      <Suspense>
        <div className="container min-h-full gap-5 pt-20 px-8 mb-16 md:px-12 md:pt-28 overflow-auto">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
