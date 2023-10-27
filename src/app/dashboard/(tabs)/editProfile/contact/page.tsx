import EditProfileContactForm from "@/components/editProfile/EditProfileContactForm";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function Contact() {
  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return <EditProfileContactForm prefetchedUser={prefetchedUser} />;
}
