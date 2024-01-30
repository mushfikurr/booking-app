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
  const businessTitle = businessUser?.user.name;
  const about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget turpis nec mauris ullamcorper fermentum id vel quam. Sed vehicula lectus ut tellus varius, non dictum justo ullamcorper. Proin euismod arcu vel nulla dignissim, vel tincidunt ipsum tristique. Aliquam erat volutpat. Vestibulum nec dui eget ligula luctus accumsan. Curabitur auctor, elit ut varius volutpat, ipsum tortor cursus justo, at ultricies diam ipsum ac libero. Etiam ullamcorper velit eu dui luctus, a fermentum mauris congue. Quisque ut risus non felis fermentum dapibus. Vivamus vel ultrices elit.";

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
