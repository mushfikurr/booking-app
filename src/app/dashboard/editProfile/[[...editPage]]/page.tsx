import EditProfileContactForm from "@/components/editProfile/EditProfileContactForm";
import EditFormNavigation from "@/components/editProfile/EditProfileFormNavigation";
import EditProfileLocationForm from "@/components/editProfile/EditProfileLocationForm";
import EditProfilePersonalForm from "@/components/editProfile/EditProfilePersonalForm";
import {
  GetUserWithBusinessDataReturn,
  getUserWithBusinessData,
} from "@/lib/serverQuery";

export default async function DashboardEditProfilePage({
  params,
}: {
  params: { editPage?: [string] };
}) {
  let currentEditPage = "personal";
  if (params.editPage) currentEditPage = params.editPage[0];

  const prefetchedUser: GetUserWithBusinessDataReturn =
    await getUserWithBusinessData();

  return (
    <div className="space-y-3 flex-grow">
      <EditFormNavigation editPage={currentEditPage} />
      {currentEditPage === "personal" && (
        <EditProfilePersonalForm prefetchedUser={prefetchedUser} />
      )}
      {currentEditPage === "location" && (
        <EditProfileLocationForm prefetchedUser={prefetchedUser} />
      )}
      {currentEditPage === "contact" && (
        <EditProfileContactForm prefetchedUser={prefetchedUser} />
      )}
    </div>
  );
}
