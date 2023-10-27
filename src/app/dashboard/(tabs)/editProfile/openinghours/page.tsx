import EditProfilePersonalForm from "@/components/editProfile/EditProfilePersonalForm";
import OpeningHours from "@/components/openingHours/OpeningHours";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function OpeningHoursPage() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return <OpeningHours businessId={prefetchedUser?.businessUser?.id} />;
}
