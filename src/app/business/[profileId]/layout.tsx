import { getBusinessUser } from "@/lib/query/serverQuery";
import { cn } from "@/lib/utils";
import { BusinessUser } from "@prisma/client";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Contact from "./(components)/Contact";
import { OpeningHourList } from "./(components)/OpeningHourList";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: any;
}>) {
  const { profileId } = params;
  const businessUser = await getBusinessUser({ profileId });

  if (!businessUser) notFound();

  return (
    <div className="flex pt-24 container pb-[2rem] min-h-screen gap-8 max-sm:flex-col max-w-7xl">
      <div className="basis-2/3">{children}</div>
      <div
        className={cn(
          "sticky top-20 self-start grow flex flex-col gap-6",
          "max-sm:w-full"
        )}
      >
        <Contact businessUser={businessUser as BusinessUser} />
        <OpeningHourList businessUser={businessUser as BusinessUser} />
      </div>
    </div>
  );
}
