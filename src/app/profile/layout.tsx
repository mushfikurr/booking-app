import { Suspense } from "react";
import { SidebarWrapper } from "./SidebarWrapper";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
