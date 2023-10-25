import EditProfilePicture from "@/components/editProfile/EditProfilePicture";
import { TabsContent } from "@/components/ui/tabs";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { getUserWithBusinessData } from "@/lib/serverQuery";
import { ReactNode } from "react";

export default async function EditProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user: UserWithBusinessUser = await getUserWithBusinessData();

  return (
    <TabsContent value="editProfile">
      <div className="space-y-6">
        <div className="flex gap-6">
          <>{children}</>
          <EditProfilePicture user={user} />
        </div>
      </div>
    </TabsContent>
  );
}
