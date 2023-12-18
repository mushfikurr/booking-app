import { ReactNode } from "react";
import Contact from "./(components)/Contact";
import { OpeningHourList } from "./(components)/OpeningHourList";
import { getBusinessUser } from "@/lib/serverQuery";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: any;
}>) {
  const { profileId } = params;
  const businessUser = await getBusinessUser({ profileId });

  return (
    <div className="flex pt-24 container min-h-screen gap-8 max-sm:flex-col max-w-7xl">
      <div className="basis-2/3">{children}</div>
      <div className="sticky top-20 self-start grow flex flex-col gap-6">
        <Contact />
        <OpeningHourList />
      </div>
    </div>
  );
}
