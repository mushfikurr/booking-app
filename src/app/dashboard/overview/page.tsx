import Overview from "@/components/overview/Overview";
import { TabsContent } from "@/components/ui/tabs";
import { getUserWithBusinessData } from "@/lib/serverQuery";
import { BusinessUser, User } from "@prisma/client";

export default async function DashboardOverview() {
  // TODO: Move Overview component to page.tsx
  const user = await getUserWithBusinessData();
  return (
    <TabsContent value="overview">
      <Overview user={user} />
    </TabsContent>
  );
}
