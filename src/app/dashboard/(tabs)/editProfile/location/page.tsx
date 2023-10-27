import EditProfileLocationForm from "@/components/editProfile/EditProfileLocationForm";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function Location() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return <EditProfileLocationForm prefetchedUser={prefetchedUser} />;
}
