import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { db } from "@/lib/db";
import { getBusinessUser } from "@/lib/query/serverQuery";
import { BusinessUser } from "@prisma/client";
import { Suspense } from "react";
import { BusinessAbout } from "./(components)/BusinessAbout";
import { BusinessTitle } from "./(components)/BusinessTitle";
import { HeaderCarousel } from "./(components)/HeaderImage";
import { Reviews } from "./(components)/ReviewList";
import { ServiceList } from "./(components)/ServiceList";

export default async function Profile({ params }: { params: any }) {
  const { profileId } = params;
  const businessUser = await getBusinessUser({ profileId });
  const businessTitle = businessUser?.businessDisplayName;
  const about =
    businessUser?.about ?? `Welcome to ${businessUser?.user?.name}!`;
  const prefetchedAlbumData = await db.album.findFirst({
    where: { businessUserId: businessUser?.id },
    include: { images: true },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <HeaderCarousel
        prefetchedAlbumData={prefetchedAlbumData}
        businessUser={businessUser}
      />
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
