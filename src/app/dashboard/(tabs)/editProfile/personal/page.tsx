import EditProfilePersonalForm from "@/components/editProfile/EditProfilePersonalForm";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function Personal() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return <EditProfilePersonalForm prefetchedUser={prefetchedUser} />;
}
