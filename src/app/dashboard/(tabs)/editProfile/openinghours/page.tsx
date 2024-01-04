import OpeningHoursDisplay from "@/components/openingHours/OpeningHoursDisplay";
import {
  GetUserWithBusinessDataReturn,
  getOpeningHoursData,
  getUserWithBusinessData,
} from "@/lib/query/serverQuery";

export default async function OpeningHoursPage() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  const openingHoursForBusinessUser = await getOpeningHoursData(
    prefetchedUser?.businessUser?.id
  );
  return (
    <OpeningHoursDisplay
      businessId={prefetchedUser?.businessUser?.id}
      prefetchedOpeningHours={openingHoursForBusinessUser}
    />
  );
}
