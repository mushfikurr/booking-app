import { getBusinessUser } from "@/lib/query/serverQuery";
import { BusinessUser } from "@prisma/client";
import { Suspense } from "react";
import { BusinessAbout } from "./(components)/BusinessAbout";
import { BusinessTitle } from "./(components)/BusinessTitle";
import { HeaderImage } from "./(components)/HeaderImage";
import { Reviews } from "./(components)/ReviewList";
import { ServiceList } from "./(components)/ServiceList";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default async function Profile({ params }: { params: any }) {
  const { profileId } = params;
  const businessUser = await getBusinessUser({ profileId });
  const businessTitle = businessUser?.businessDisplayName;
  const about =
    businessUser?.about ?? `Welcome to ${businessUser?.user?.name}!`;

  return (
    <div className="flex flex-col gap-1.5">
      <HeaderImage />
      <BusinessTitle businessUser={businessUser} />

      <div className="flex flex-col gap-8">
        <BusinessAbout businessTitle={businessTitle} about={about} />

        <Suspense fallback={<LoadingSkeleton />}>
          <ServiceList businessUser={businessUser as BusinessUser} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <Reviews />
        </Suspense>
      </div>
    </div>
  );
}
