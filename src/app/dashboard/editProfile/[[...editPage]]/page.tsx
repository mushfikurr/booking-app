import EditProfileContactForm from "@/components/editProfile/EditProfileContactForm";
import EditFormNavigation from "@/components/editProfile/EditProfileFormNavigation";
import EditProfileLocationForm from "@/components/editProfile/EditProfileLocationForm";
import EditProfilePersonalForm from "@/components/editProfile/EditProfilePersonalForm";

export default async function DashboardEditProfilePage({
  params,
}: {
  params: { editPage?: [string] };
}) {
  let currentEditPage = "personal";
  if (params.editPage) {
    currentEditPage = params.editPage[0];
  }
  
  return (
    <div className="space-y-3 flex-grow">
      <EditFormNavigation editPage={params.editPage} />
      {currentEditPage === "personal" && <EditProfilePersonalForm />}
      {currentEditPage === "location" && <EditProfileLocationForm />}
      {currentEditPage === "contact" && <EditProfileContactForm />}
    </div>
  );
}
