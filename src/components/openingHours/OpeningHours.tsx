import { getOpeningHoursData } from "@/lib/serverQuery";
import OpeningHoursDisplay from "./OpeningHoursDisplay";

export default async function OpeningHours({
  businessId,
}: {
  businessId: string | undefined;
}) {
  const openingHoursForBusinessUser = await getOpeningHoursData(businessId);
  return <OpeningHoursDisplay businessId={businessId} openingHours={openingHoursForBusinessUser} />;
}
