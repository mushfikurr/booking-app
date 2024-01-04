import EditProfileLocationForm from "@/app/dashboard/(tabs)/editProfile/location/(components)/EditProfileLocationForm";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function Location() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return <EditProfileLocationForm prefetchedUser={prefetchedUser} />;
}
