import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions } from "../(auth)/AuthOptions";
import { SidebarWrapper } from "./SidebarWrapper";

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
      <SidebarWrapper />
      <Suspense>
        <div className="container min-h-full gap-5 pt-20 max-sm:px-8 mb-16 md:pt-28 overflow-auto">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
