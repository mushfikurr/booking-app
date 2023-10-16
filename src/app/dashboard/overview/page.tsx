import Overview from "@/components/overview/Overview";
import { TabsContent } from "@/components/ui/tabs";
import { getUserWithBusinessData } from "@/lib/query";
import { BusinessUser, User } from "@prisma/client";

export default async function DashboardOverview() {
  // TODO: Move Overview component to page.tsx
  const { userData, businessUser } = await getUserWithBusinessData();
  return (
    <TabsContent value="overview">
      <Overview
        businessUser={businessUser as BusinessUser}
        user={userData as User}
      />
    </TabsContent>
  );
}
